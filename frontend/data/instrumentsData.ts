import { Instrument } from "../types";

export const instruments: Instrument[] = [
  {
    id: "1",
    name: "Cryptocurrency",
    type: "Cryptocurrency",
    description: "Digital currency operating on a decentralized network",
    exchanges: [
      {
        id: "1",
        name: "Binance",
        symbol: "BTC/USDT",
        price: 65000,
        change: 2.5,
        volume: 1500000000,
      },
      {
        id: "2",
        name: "Coinbase",
        symbol: "BTC/USD",
        price: 64900,
        change: 2.3,
        volume: 1000000000,
      },
    ],
  },
  {
    id: "2",
    name: "Stock",
    type: "Stock",
    description: "Technology company specializing in consumer electronics",
    exchanges: [
      {
        id: "3",
        name: "NASDAQ",
        symbol: "AAPL",
        price: 175.5,
        change: -0.5,
        volume: 50000000,
      },
    ],
  },
  {
    id: "3",
    name: "Bond",
    type: "Bond",
    description: "Government bond with a fixed interest rate",
    exchanges: [
      {
        id: "4",
        name: "NYSE",
        symbol: "US10Y",
        price: 100,
        change: 0.1,
        volume: 200000000,
      },
    ],
  },
  {
    id: "4",
    name: "Mutual Fund",
    type: "Mutual Fund",
    description: "Diversified portfolio of stocks and bonds",
    exchanges: [
      {
        id: "5",
        name: "Vanguard",
        symbol: "VFIAX",
        price: 350,
        change: 1.2,
        volume: 30000000,
      },
    ],
  },
];
