import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  initializeFirestore,
  orderBy,
  persistentLocalCache,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, ReactNode, useContext, useState } from "react";
import { ChoreData, Household, Member, Period } from "../types";
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
  addMember: (name: string) => Promise<void>;
  toggleMemberStatus: (memberId: string) => Promise<void>;
  finishPeriod: (startNew: boolean) => Promise<void>;
  getPastPeriods: () => Promise<Period[]>;
  getPeriodActivities: (periodId: string) => Promise<{
    period: Period;
    activities: Activity[];
  }>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [currentHousehold, setCurrentHousehold] = useState<Household | null>(
    null
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

  const addMember = async (name: string) => {
    if (!currentHousehold) return;
    const trimmedName = name.trim();
    if (trimmedName) {
      const newId = trimmedName.toLowerCase().replace(/\s+/g, "-");
      const newMember: Member = {
        id: newId,
        name: trimmedName,
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
      m.id === memberId ? { ...m, disabled: !m.disabled } : m
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
      "periods"
    );
    const q = query(periodsRef, where("endDate", "==", null));
    const snapshot = await getDocs(q);

    const now = new Date().toISOString();

    const updates = snapshot.docs.map((doc) =>
      updateDoc(doc.ref, { endDate: now })
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
      "periods"
    );
    const q = query(periodsRef, orderBy("startDate", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() } as Period))
      .filter((p) => p.endDate);
  };

  const getPeriodActivities = async (periodId: string) => {
    if (!currentHousehold) throw new Error("No household selected");

    const periodDoc = await getDoc(
      doc(db, "households", currentHousehold.id, "periods", periodId)
    );

    if (!periodDoc.exists()) {
      throw new Error("Period not found");
    }

    const period = { id: periodDoc.id, ...periodDoc.data() } as Period;

    const memberActivity: Record<string, ChoreData> = {};
    await Promise.all(
      currentHousehold.members.map(async (member) => {
        const activityDoc = await getDoc(
          doc(db, "households", currentHousehold.id, "activity", member.id)
        );
        if (activityDoc.exists()) {
          memberActivity[member.id] = activityDoc.data() as ChoreData;
        }
      })
    );

    const start = new Date(period.startDate);
    const end = period.endDate ? new Date(period.endDate) : new Date();
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const dates: string[] = [];
    const current = new Date(start);

    while (current <= end) {
      dates.push(formatDateKey(new Date(current)));
      current.setDate(current.getDate() + 1);
    }

    const activities: Activity[] = [];

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
        addMember,
        toggleMemberStatus,
        finishPeriod,
        getPastPeriods,
        getPeriodActivities,
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
