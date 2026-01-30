import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  increment,
  initializeFirestore,
  limit,
  orderBy,
  persistentLocalCache,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, ReactNode, useContext, useState } from "react";
import {
  AccentColor,
  ActivityRecord,
  ChoreData,
  Household,
  HouseholdMember,
  Language,
  Period,
} from "../types";
import { formatDateKey } from "../utils";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});

export interface Activity {
  id: string;
  date: string;
  memberId: string;
  memberName: string;
  choreLabel: string;
  value: number;
}

interface DataContextType {
  db: Firestore;
  currentHousehold: Household | null;
  selectHousehold: (household: Household) => void;
  leaveHousehold: () => void;
  updateHouseholdName: (name: string) => Promise<void>;
  updateHouseholdLanguage: (language: Language) => Promise<void>;
  addMember: (name: string, emoji: string, color: AccentColor) => Promise<void>;
  toggleMemberStatus: (memberId: string) => Promise<void>;
  updateMember: (
    memberId: string,
    data: Partial<HouseholdMember>,
  ) => Promise<void>;
  finishPeriod: (startNew: boolean) => Promise<void>;
  getPastPeriods: () => Promise<Period[]>;
  getPeriodActivities: (periodId: string) => Promise<{
    period: Period;
    activities: Activity[];
  }>;
  recordActivity: (
    memberId: string,
    choreId: string,
    dateKey: string,
    direction: "increment" | "decrement",
  ) => Promise<void>;
  getRecentActivities: (limitCount?: number) => Promise<Activity[]>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [currentHousehold, setCurrentHousehold] = useState<Household | null>(
    null,
  );

  const selectHousehold = (household: Household) => {
    setCurrentHousehold(household);
    localStorage.setItem("payDayPal_selectedHouseholdId", household.id);
  };

  const leaveHousehold = () => {
    setCurrentHousehold(null);
    localStorage.removeItem("payDayPal_selectedHouseholdId");
  };

  const updateHouseholdName = async (name: string) => {
    if (!currentHousehold) return;
    const trimmedName = name.trim();
    if (trimmedName !== currentHousehold.name) {
      await updateDoc(doc(db, "households", currentHousehold.id), {
        name: trimmedName,
      });
      setCurrentHousehold({ ...currentHousehold, name: trimmedName });
    }
  };

  const updateHouseholdLanguage = async (language: Language) => {
    if (!currentHousehold) return;
    if (language !== currentHousehold.language) {
      await updateDoc(doc(db, "households", currentHousehold.id), {
        language,
      });
      setCurrentHousehold({ ...currentHousehold, language });
    }
  };

  const addMember = async (name: string, emoji: string, color: AccentColor) => {
    if (!currentHousehold) return;
    const trimmedName = name.trim();
    if (trimmedName) {
      const newId = trimmedName.toLowerCase().replace(/\s+/g, "-");
      const newMember: HouseholdMember = {
        id: newId,
        name: trimmedName,
        emoji,
        color,
      };
      const newMembers = [...currentHousehold.members, newMember];
      await updateDoc(doc(db, "households", currentHousehold.id), {
        members: newMembers,
      });
      setCurrentHousehold({ ...currentHousehold, members: newMembers });
    }
  };

  const toggleMemberStatus = async (memberId: string) => {
    if (!currentHousehold) return;
    const newMembers = currentHousehold.members.map((m) =>
      m.id === memberId ? { ...m, disabled: !m.disabled } : m,
    );
    await updateDoc(doc(db, "households", currentHousehold.id), {
      members: newMembers,
    });
    setCurrentHousehold({ ...currentHousehold, members: newMembers });
  };

  const updateMember = async (
    memberId: string,
    data: Partial<HouseholdMember>,
  ) => {
    if (!currentHousehold) return;
    const newMembers = currentHousehold.members.map((m) =>
      m.id === memberId ? { ...m, ...data } : m,
    );
    await updateDoc(doc(db, "households", currentHousehold.id), {
      members: newMembers,
    });
    setCurrentHousehold({ ...currentHousehold, members: newMembers });
  };

  const finishPeriod = async (startNew: boolean) => {
    if (!currentHousehold) return;

    const periodsRef = collection(
      db,
      "households",
      currentHousehold.id,
      "periods",
    );
    const q = query(periodsRef, where("endDate", "==", null));
    const snapshot = await getDocs(q);

    const now = Timestamp.now();

    const updates = snapshot.docs.map((doc) =>
      updateDoc(doc.ref, { endDate: now }),
    );
    await Promise.all(updates);

    if (startNew) {
      await addDoc(periodsRef, {
        startDate: now,
        endDate: null,
        createdAt: Timestamp.now(),
      });
    }
  };

  const getPastPeriods = async () => {
    if (!currentHousehold) return [];
    const periodsRef = collection(
      db,
      "households",
      currentHousehold.id,
      "periods",
    );
    const q = query(periodsRef, orderBy("startDate", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }) as Period)
      .filter((p) => p.endDate);
  };

  const recordActivity = async (
    memberId: string,
    choreId: string,
    dateKey: string,
    direction: "increment" | "decrement",
  ) => {
    if (!currentHousehold) return;
    const chore = currentHousehold.chores.find((c) => c.id === choreId);
    if (!chore) return;

    const activityRef = doc(
      db,
      "households",
      currentHousehold.id,
      "activity",
      memberId,
    );

    if (direction === "increment") {
      await addDoc(
        collection(db, "households", currentHousehold.id, "activity_records"),
        {
          memberId,
          choreId,
          date: dateKey,
          createdAt: Timestamp.now(),
          value: chore.value,
          choreLabel:
            chore.labels[currentHousehold.language] || chore.labels["en"],
        },
      );
      await updateDoc(activityRef, {
        [`${dateKey}_${choreId}`]: increment(1),
      });
    } else {
      const recordsRef = collection(
        db,
        "households",
        currentHousehold.id,
        "activity_records",
      );
      const q = query(
        recordsRef,
        where("memberId", "==", memberId),
        where("choreId", "==", choreId),
        where("date", "==", dateKey),
        orderBy("createdAt", "desc"),
        limit(1),
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        await deleteDoc(snapshot.docs[0].ref);
      }
      await updateDoc(activityRef, {
        [`${dateKey}_${choreId}`]: increment(-1),
      });
    }
  };

  const getRecentActivities = async (limitCount = 50) => {
    if (!currentHousehold) return [];
    const recordsRef = collection(
      db,
      "households",
      currentHousehold.id,
      "activity_records",
    );
    const q = query(
      recordsRef,
      orderBy("createdAt", "desc"),
      limit(limitCount),
    );
    const snapshot = await getDocs(q);

    const activities: Activity[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as ActivityRecord;
      const member = currentHousehold.members.find(
        (m) => m.id === data.memberId,
      );
      if (member) {
        activities.push({
          id: doc.id,
          date: data.date,
          memberId: data.memberId,
          memberName: member.name,
          choreLabel: data.choreLabel,
          value: data.value,
        });
      }
    });
    return activities;
  };

  const getPeriodActivities = async (periodId: string) => {
    if (!currentHousehold) throw new Error("No household selected");

    const periodDoc = await getDoc(
      doc(db, "households", currentHousehold.id, "periods", periodId),
    );

    if (!periodDoc.exists()) {
      throw new Error("Period not found");
    }

    const period = { id: periodDoc.id, ...periodDoc.data() } as Period;

    const start = new Date(period.startDate);
    const end = period.endDate ? new Date(period.endDate) : new Date();
    const startKey = formatDateKey(start);
    const endKey = formatDateKey(end);

    // Try fetching from activity_records first
    const recordsRef = collection(
      db,
      "households",
      currentHousehold.id,
      "activity_records",
    );
    const q = query(
      recordsRef,
      where("date", ">=", startKey),
      where("date", "<=", endKey),
    );
    const snapshot = await getDocs(q);

    const activities: Activity[] = [];

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        const data = doc.data() as ActivityRecord;
        const member = currentHousehold.members.find(
          (m) => m.id === data.memberId,
        );
        if (member) {
          activities.push({
            id: doc.id,
            date: data.date,
            memberId: data.memberId,
            memberName: member.name,
            choreLabel: data.choreLabel,
            value: data.value,
          });
        }
      });
      activities.sort((a, b) => a.date.localeCompare(b.date));
    } else {
      // Fallback to old logic for periods before activity_records
      const memberActivity: Record<string, ChoreData> = {};
      await Promise.all(
        currentHousehold.members.map(async (member) => {
          const activityDoc = await getDoc(
            doc(db, "households", currentHousehold.id, "activity", member.id),
          );
          if (activityDoc.exists()) {
            memberActivity[member.id] = activityDoc.data() as ChoreData;
          }
        }),
      );

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      const dates: string[] = [];
      const current = new Date(start);

      while (current <= end) {
        dates.push(formatDateKey(new Date(current)));
        current.setDate(current.getDate() + 1);
      }

      dates.forEach((dateKey) => {
        currentHousehold.members.forEach((member) => {
          const data = memberActivity[member.id] || {};
          currentHousehold.chores.forEach((chore) => {
            const key = `${dateKey}_${chore.id}`;
            const count = Number(data[key] || 0);
            if (count > 0 && chore.value > 0) {
              for (let i = 0; i < count; i++) {
                activities.push({
                  id: `${member.id}_${key}_${i}`,
                  date: dateKey,
                  memberId: member.id,
                  memberName: member.name,
                  choreLabel: chore.labels["en"],
                  value: chore.value,
                });
              }
            }
          });
        });
      });
    }

    return { period, activities };
  };

  return (
    <DataContext.Provider
      value={{
        db,
        currentHousehold,
        selectHousehold,
        leaveHousehold,
        updateHouseholdName,
        updateHouseholdLanguage,
        addMember,
        toggleMemberStatus,
        updateMember,
        finishPeriod,
        getPastPeriods,
        getPeriodActivities,
        recordActivity,
        getRecentActivities,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within DataProvider");
  return context;
};
