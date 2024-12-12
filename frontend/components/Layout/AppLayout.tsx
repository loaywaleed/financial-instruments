"use client";
import React, { useState } from "react";
import { AppShell, Container, Group } from "@mantine/core";
import { Header } from "components/Layout/Header";
import { Footer } from "components/Layout/Footer";
import { Sidebar } from "components/Navigation/Sidebar";
import { NavigationTabs } from "components/Navigation/NavigationTabs";
import { CandlestickChart } from "components/Charts/CandlestickChart";
import { InstrumentDetails } from "components/Content/InstrumentDetails";
import { instruments } from "data/instrumentsData";

function AppLayout() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(
    null
  );
  const [selectedExchange, setSelectedExchange] = useState<string | null>(null);

  const handleInstrumentSelect = (instrumentId: string) => {
    setSelectedInstrument(instrumentId);
    setSelectedExchange(null);
  };

  const handleExchangeSelect = (instrumentId: string, exchangeId: string) => {
    setSelectedInstrument(instrumentId);
    setSelectedExchange(exchangeId);
  };

  const selectedInstrumentData = selectedInstrument
    ? instruments.find((i) => i.id === selectedInstrument)
    : null;

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm" }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Sidebar
          onInstrumentSelect={handleInstrumentSelect}
          onExchangeSelect={handleExchangeSelect}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl">
          <Group mb="md">
            <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </Group>

          {selectedInstrumentData && (
            <>
              {selectedExchange ? (
                <CandlestickChart />
              ) : (
                <InstrumentDetails instrument={selectedInstrumentData} />
              )}
            </>
          )}
        </Container>
      </AppShell.Main>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}

export default AppLayout;
