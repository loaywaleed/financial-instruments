import React, { useEffect, useState } from "react";
import { Text, Loader } from "@mantine/core";
import { api } from "utils/api";
import { MetadataType } from "types/MetadataType";
import { Identification } from "./Metadata/Identification";

interface PerformanceMetricProps {
  symbol: string;
}

export function Metadata({ symbol }: PerformanceMetricProps) {
  const [metadata, setMetadata] = useState<MetadataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/metadata?symbol=${symbol}`);
        if (!response) throw new Error("Failed to fetch metadata");
        const data = await response.data;
        setMetadata(data);
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
  if (!metadata) return null;

  return <Identification {...metadata} />;
}
