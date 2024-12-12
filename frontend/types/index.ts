export interface Instrument {
  id: string;
  name: string;
  type: string;
  description: string;
  exchanges: Exchange[];
}

export interface Exchange {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  volume: number;
}

export interface NavigationTabsProps {
  activeTab: string;

  onTabChange: (value: string) => void;
}
