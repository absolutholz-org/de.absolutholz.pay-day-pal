import { ArrowLeft, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PageContainer } from "../components/PageContainer";
import { PageHeadline } from "../components/PageHeadline";
import { useData } from "../context/DataContext";
import {
  Card,
  CardMeta,
  CardTitle,
  Header,
  IconButton,
  Subtitle,
} from "../styles";
import { Period } from "../types";

export default function HistoryScreen() {
  const { getPastPeriods } = useData();
  const [periods, setPeriods] = useState<Period[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPastPeriods().then((data) => {
      console.log({ periods: data });
      setPeriods(data);
      setLoading(false);
    });
  }, [getPastPeriods]);

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
        <Link to="/settings">
          <IconButton>
            <ArrowLeft size={24} />
          </IconButton>
        </Link>
        <PageHeadline>History</PageHeadline>
      </Header>

      {loading ? (
        <Subtitle>Loading...</Subtitle>
      ) : periods.length === 0 ? (
        <Subtitle>No past periods found.</Subtitle>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {periods.map((period) => (
            <Link
              key={period.id}
              to={`/history/${period.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card style={{ cursor: "pointer" }}>
                <CardTitle>
                  {formatDate(period.startDate)} -{" "}
                  {period.endDate ? formatDate(period.endDate) : "Now"}
                </CardTitle>
                <CardMeta>
                  <Calendar size={16} />
                  Ended:{" "}
                  {period.endDate
                    ? new Date(period.endDate).toLocaleTimeString()
                    : "Active"}
                </CardMeta>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
