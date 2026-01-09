import { ArrowLeft, ArrowUpDown, Euro } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { PageContainer } from "../components/PageContainer";
import { PageHeadline } from "../components/PageHeadline";
import { Activity, useData } from "../context/DataContext";
import {
  Card,
  CardMeta,
  CardTitle,
  Header,
  IconButton,
  Subtitle,
} from "../styles";
import { Period } from "../types";

export default function HistoryDetailScreen() {
  const { periodId } = useParams<{ periodId: string }>();
  const { currentHousehold, getPeriodActivities } = useData();
  const [period, setPeriod] = useState<Period | null>(null);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [filterMember, setFilterMember] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!periodId) return;

    getPeriodActivities(periodId)
      .then(({ period, activities }) => {
        setPeriod(period);
        //   setAllActivities(activities);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching details:", error);
        setLoading(false);
      });
  }, [getPeriodActivities, periodId]);

  if (loading)
    return (
      <PageContainer>
        <Subtitle>Loading...</Subtitle>
      </PageContainer>
    );
  if (!period || !currentHousehold)
    return (
      <PageContainer>
        <Subtitle>Period not found.</Subtitle>
      </PageContainer>
    );

  //   const activities = useMemo(() => {
  //     let result = allActivities;
  //     if (filterMember !== "all") {
  //       result = result.filter((a) => a.memberId === filterMember);
  //     }
  //     return result.sort((a, b) => {
  //       const diff = a.date.localeCompare(b.date);
  //       return sortOrder === "asc" ? diff : -diff;
  //     });
  //   }, [allActivities, filterMember, sortOrder]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <PageContainer>
      <Header>
        <Link to="/history">
          <IconButton>
            <ArrowLeft size={24} />
          </IconButton>
        </Link>
        <PageHeadline>Details</PageHeadline>
      </Header>

      <Subtitle style={{ marginBottom: "1rem" }}>
        {formatDate(period.startDate)} -{" "}
        {period.endDate ? formatDate(period.endDate) : "Now"}
      </Subtitle>

      {/* <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <select
          value={filterMember}
          onChange={(e) => setFilterMember(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            backgroundColor: "white",
            fontSize: "1rem",
          }}
        >
          <option value="all">All Members</option>
          {currentHousehold.members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
          }
          style={{
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          title={sortOrder === "desc" ? "Newest First" : "Oldest First"}
        >
          <ArrowUpDown size={20} />
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {activities.map((activity) => (
          <Card key={activity.id} style={{ cursor: "default" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CardTitle>{activity.choreLabel}</CardTitle>
              <span
                style={{
                  color: "#2ecc71",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <Euro size={20} /> {activity.value.toFixed(2)}
              </span>
            </div>
            <CardMeta>
              {formatDate(activity.date)} • {activity.memberName}
            </CardMeta>
          </Card>
        ))}
        {activities.length === 0 && (
          <Subtitle>No activity recorded for this period.</Subtitle>
        )}
      </div> */}
    </PageContainer>
  );
}
