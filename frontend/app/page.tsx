"use client";
import React, { useState } from "react";
import { AppShell, Container } from "@mantine/core";
import { Header } from "components/Layout/Header";
import { Footer } from "components/Layout/Footer";
import { Sidebar } from "components/Navigation/Sidebar";
import { CandlestickChart } from "components/Charts/CandlestickChart";
import { InstrumentDetails } from "components/Content/InstrumentDetails";
import { instruments } from "data/instrumentsData";
import { useMediaQuery } from "@mantine/hooks";
import { Exchange } from "types/exchange";

function App() {
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(
    null
  );
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(
    null
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleInstrumentSelect = (instrumentId: string) => {
    setSelectedInstrument(instrumentId);
    setSelectedExchange(null);
  };

  const handleExchangeSelect = (instrumentId: string, exchange: Exchange) => {
    setSelectedInstrument(instrumentId);
    setSelectedExchange(exchange);
    if (isMobile) {
      setMobileNavOpen(false);
    }
  };

  const selectedInstrumentData =
    selectedInstrument && instruments.find((i) => i.id === selectedInstrument);

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: "auto" }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileNavOpen },
      }}
      padding="md"
      className="min-h-screen flex flex-col"
    >
      <AppShell.Header>
        <Header
          onMenuClick={() => setMobileNavOpen(!mobileNavOpen)}
          isMobile={isMobile}
        />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Sidebar
          onInstrumentSelect={handleInstrumentSelect}
          onExchangeSelect={handleExchangeSelect}
        />
      </AppShell.Navbar>

      <AppShell.Main className="flex-1">
        <Container size="xl" className="h-full">
          {selectedInstrumentData && (
            <>
              {selectedExchange ? (
                <CandlestickChart {...selectedExchange} />
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

export default App;
