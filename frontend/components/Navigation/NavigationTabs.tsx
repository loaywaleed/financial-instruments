"use client";
import React from "react";
import { Tabs } from "@mantine/core";
import { Home, List } from "lucide-react";

interface NavigationTabsProps {
  activeTab: string | null;
  onTabChange: React.Dispatch<React.SetStateAction<string | null>>;
}

export function NavigationTabs({
  activeTab,
  onTabChange,
}: NavigationTabsProps) {
  return (
    <Tabs value={activeTab} onChange={onTabChange}>
      <Tabs.List>
        <Tabs.Tab value="home" leftSection={<Home size={16} />}>
          Home
        </Tabs.Tab>
        <Tabs.Tab value="watchlist" leftSection={<List size={16} />}>
          Watchlist
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
