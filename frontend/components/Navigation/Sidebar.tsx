"use client";
import React, { useEffect, useState } from "react";
import { Accordion, NavLink, Box, LoadingOverlay } from "@mantine/core";
import { Building2, LineChart } from "lucide-react";
import { instruments } from "data/instrumentsData";
import { api } from "utils/api";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarSearch } from "./SidebarSearch";

interface SidebarProps {
  onInstrumentSelect: (instrumentId: string) => void;
  onExchangeSelect: (instrumentId: string, exchangeId: string) => void;
}

interface Exchange {
  _id: string;
  name: string;
  nameExchange: string;
  symbol: string;
}

export function Sidebar({
  onInstrumentSelect,
  onExchangeSelect,
}: SidebarProps) {
  const [exchangesMap, setExchangesMap] = useState<Record<string, Exchange[]>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchExchanges = async (instrumentType: string) => {
      try {
        const response = await api.get(`/instruments?type=${instrumentType}`);
        setExchangesMap((prev) => ({
          ...prev,
          [instrumentType]: response.data,
        }));
      } catch (error) {
        console.log(`Error fetching exchanges for ${instrumentType}:`, error);
        setHasError(true);
      }
    };

    const fetchAllExchanges = async () => {
      setIsLoading(true);
      try {
        await Promise.all(
          instruments.map((instrument) => fetchExchanges(instrument.type))
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllExchanges();
  }, []);

  return (
    <Box pos="relative" className="h-full">
      <SidebarHeader />
      <SidebarSearch value={searchQuery} onChange={setSearchQuery} />

      <LoadingOverlay visible={isLoading} />

      {hasError ? (
        <Box p="md" c="red">
          Error loading exchanges data. Please try again later.
        </Box>
      ) : (
        <div className="h-full overflow-y-auto">
          <Accordion
            variant="separated"
            classNames={{
              root: "h-full",
              item: "transition-all duration-300 ease-in-out",
              panel: "transition-all duration-300 ease-in-out",
              content: "transition-all duration-300 ease-in-out",
            }}
          >
            {instruments.map((instrument) => (
              <Accordion.Item key={instrument.id} value={instrument.id}>
                <Accordion.Control
                  icon={<Building2 size={20} />}
                  onClick={() => onInstrumentSelect(instrument.id)}
                >
                  {instrument.name}
                </Accordion.Control>
                <Accordion.Panel>
                  {exchangesMap[instrument.type]?.map((exchange) => (
                    <NavLink
                      key={exchange._id}
                      label={exchange.name}
                      leftSection={<LineChart size={16} />}
                      onClick={() =>
                        onExchangeSelect(instrument.id, exchange.symbol)
                      }
                      description={exchange.nameExchange}
                    />
                  ))}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      )}
    </Box>
  );
}
