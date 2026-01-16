import { ArrowLeft, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PageContainer } from "../components/PageContainer";
import { PageHeader } from "../components/PageHeader";
import { useData } from "../context/DataContext";
import { Card, CardMeta, CardTitle, Subtitle } from "../globalStyles";
import { Period } from "../types";
import { formatDate } from "../utils";

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

  return (
    <>
      <PageHeader
        title="History"
        slotLead={
          <Link to="/settings">
            <ArrowLeft size={24} />
          </Link>
        }
      />
      <PageContainer>
        {loading ? (
          <Subtitle>Loading...</Subtitle>
        ) : periods.length === 0 ? (
          <Subtitle>No past periods found.</Subtitle>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
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
                      ? period.endDate.toLocaleTimeString()
                      : "Active"}
                  </CardMeta>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </PageContainer>
    </>
  );
}
