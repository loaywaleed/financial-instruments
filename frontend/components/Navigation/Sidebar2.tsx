"use client";
import React, { useEffect, useState } from "react";
import { Accordion, NavLink } from "@mantine/core";
import { Building2, LineChart } from "lucide-react";
import { instruments } from "data/instrumentsData";
import { api } from "utils/api";

interface SidebarProps {
  onInstrumentSelect: (instrumentId: string) => void;
  onExchangeSelect: (instrumentId: string, exchangeId: string) => void;
}

interface Exchange {
  id: string;
  name: string;
}

export function Sidebar({
  onInstrumentSelect,
  onExchangeSelect,
}: SidebarProps) {
  const [exchangesMap, setExchangesMap] = useState<Record<string, Exchange[]>>(
    {}
  );

  useEffect(() => {
    const fetchExchanges = async (instrumentType: string) => {
      try {
        const response = await api.get(`/instruments?type=${instrumentType}`);
        setExchangesMap((prev) => ({
          ...prev,
          [instrumentType]: response.data,
        }));
      } catch (error) {
        console.error(`Error fetching exchanges for ${instrumentType}:`, error);
      }
    };

    instruments.forEach((instrument) => {
      fetchExchanges(instrument.type);
    });
  }, []);

  return (
    <Accordion>
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
                key={exchange.id}
                label={exchange.name}
                leftSection={<LineChart size={16} />}
                onClick={() => onExchangeSelect(instrument.id, exchange.id)}
              />
            ))}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
