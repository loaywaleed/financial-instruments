export interface Instrument {
  id: string;
  name: string;
  type: string;
  description: string;
  exchanges: Exchange[];
}

export interface Exchange {
  _id: string;
  name: string;
  nameExchange: string;
  symbol: string;
  price: number;
  change: number;
  volume: number;
  codeExchange: string;
}

export interface NavigationTabsProps {
  activeTab: string;

  onTabChange: (value: string) => void;
}
