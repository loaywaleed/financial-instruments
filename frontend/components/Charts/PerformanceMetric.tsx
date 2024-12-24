import React, { useEffect, useState } from "react";
import { Group, Text, Loader, Paper, Grid } from "@mantine/core";
import { TrendingUp, TrendingDown } from "lucide-react";
import { api } from "utils/api";

interface MetadataType {
  key: string;
  value: number;
}

interface PerformanceMetricProps {
  symbol: string;
}

export function PerformanceMetric({ symbol }: PerformanceMetricProps) {
  const [metadata, setMetadata] = useState<MetadataType | "">(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/metadata?symbol=${symbol}`);
        if (!response) throw new Error("Failed to fetch metadata");
        const data = await response.data;
        if (!data.exchangeTradedFundDetails) {
          setMetadata("");
          console.log("No performance data available");
        } else {
          setMetadata(data.exchangeTradedFundDetails.performance);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchMetadata();
    }
  }, [symbol]);

  if (loading) return <Loader size="sm" />;
  if (error) return <Text color="red">{error}</Text>;

  if (!metadata) return "";

  return (
    <Paper p="md" mt="md" withBorder>
      <Text size="lg" fw={600} mb="md">
        Performance Metrics
      </Text>
      <Grid>
        <Grid.Col>
          <Group grow>
            {Object.entries(metadata).map(([period, value]) => (
              <div key={period} className="flex items-center gap-2">
                {value >= 0 ? (
                  <TrendingUp size={20} color="green" />
                ) : (
                  <TrendingDown size={20} color="red" />
                )}
                <div>
                  <Text size="sm" tt="capitalize">
                    {period}
                  </Text>
                  <Text fw={500} color={value >= 0 ? "green" : "red"}>
                    {value}%
                  </Text>
                </div>
              </div>
            ))}
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
