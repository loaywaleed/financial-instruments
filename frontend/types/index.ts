import { Exchange } from "./exchange";
export interface Instrument {
  id: string;
  name: string;
  type: string;
  description: string;
  exchanges: Exchange[];
}

export interface NavigationTabsProps {
  activeTab: string;

  onTabChange: (value: string) => void;
}
