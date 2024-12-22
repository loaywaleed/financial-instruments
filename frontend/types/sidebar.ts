import { Exchange } from "./exchange";

export interface SidebarProps {
  onInstrumentSelect: (instrumentId: string) => void;
  onExchangeSelect: (instrumentId: string, exchange: Exchange) => void;
}
