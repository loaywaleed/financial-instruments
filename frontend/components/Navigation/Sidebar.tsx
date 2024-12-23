"use client";
import React, { useEffect, useState } from "react";
import { Accordion, NavLink, Box, LoadingOverlay } from "@mantine/core";
import { Building2, LineChart } from "lucide-react";
import { instruments } from "data/instrumentsData";
import { api } from "utils/api";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarSearch } from "./SidebarSearch";
import { Exchange } from "types/exchange";
import { SidebarProps } from "types/sidebar";

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
  const [activeInstrument, setActiveInstrument] = useState<string | null>(null);

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

  const getFilteredExchanges = (instrumentType: string) => {
    const exchanges = exchangesMap[instrumentType] || [];
    return exchanges.filter(
      (exchange) =>
        exchange.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exchange.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exchange.nameExchange.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    if (searchQuery) {
      for (const instrument of instruments) {
        const filteredExchanges = getFilteredExchanges(instrument.type);
        if (filteredExchanges.length > 0) {
          setActiveInstrument(instrument.id);
          break;
        }
      }
    }
  }, [searchQuery]);

  return (
    <Box
      pos="relative"
      className="h-full overflow-y-hidden"
      style={{ overflowY: "auto", scrollbarWidth: "none" }}
    >
      <div className="flex flex-col h-full">
        <div className="flex-none">
          <SidebarHeader />
          <SidebarSearch value={searchQuery} onChange={setSearchQuery} />
        </div>

        <LoadingOverlay visible={isLoading} />

        {hasError ? (
          <Box p="md" c="red">
            Error loading exchanges data. Please try again later.
          </Box>
        ) : (
          <Box className="overflow-y-auto">
            <Accordion
              variant="separated"
              value={activeInstrument || ""}
              onChange={(value) => setActiveInstrument(value as string)}
              classNames={{
                root: "pb-4",
                item: "border-b border-gray-200 dark:border-gray-700",
                control:
                  "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                panel: "bg-gray-50 dark:bg-gray-900",
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
                    {getFilteredExchanges(instrument.type).map((exchange) => (
                      <NavLink
                        key={exchange._id}
                        label={exchange.name}
                        leftSection={<LineChart size={16} />}
                        onClick={() =>
                          onExchangeSelect(instrument.id, exchange)
                        }
                        description={exchange.nameExchange}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      />
                    ))}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Box>
        )}
      </div>
    </Box>
  );
}
