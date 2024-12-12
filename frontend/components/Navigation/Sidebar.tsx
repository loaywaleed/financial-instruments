"use client";
import React from "react";
import { Accordion, NavLink } from "@mantine/core";
import { Building2, LineChart } from "lucide-react";
import { instruments } from "data/instrumentsData";

interface SidebarProps {
  onInstrumentSelect: (instrumentId: string) => void;
  onExchangeSelect: (instrumentId: string, exchangeId: string) => void;
}

export function Sidebar({
  onInstrumentSelect,
  onExchangeSelect,
}: SidebarProps) {
  return (
    <Accordion>
      <Accordion.Item value="instruments">
        <Accordion.Control icon={<Building2 size={20} />}>
          Instruments
        </Accordion.Control>
        <Accordion.Panel>
          {instruments.map((instrument) => (
            <Accordion key={instrument.id}>
              <Accordion.Item value={instrument.id}>
                <Accordion.Control
                  onClick={() => onInstrumentSelect(instrument.id)}
                >
                  {instrument.name}
                </Accordion.Control>
                <Accordion.Panel>
                  {instrument.exchanges.map((exchange) => (
                    <NavLink
                      key={exchange.id}
                      label={exchange.name}
                      leftSection={<LineChart size={16} />}
                      onClick={() =>
                        onExchangeSelect(instrument.id, exchange.id)
                      }
                    />
                  ))}
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          ))}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
