import React, { useEffect, useRef, useState } from "react";
import { createChart, Time } from "lightweight-charts";
import { Paper } from "@mantine/core";
import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { api } from "utils/api";
import { Exchange } from "types/exchange";
import { ChartHeader } from "./ChartHeader";

export function CandlestickChart(exchange: Exchange) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/candles?symbol=${exchange.symbol}`);
        const result = await response.data;
        console.log("Candlestick data:", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching candlestick data:", error);
      }
    }

    fetchData();
  }, [exchange]);

  useEffect(() => {
    if (chartContainerRef.current && data.length > 0) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: {
            color:
              colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
          },
          textColor:
            colorScheme === "dark"
              ? theme.colors.gray[3]
              : theme.colors.dark[9],
        },
        grid: {
          vertLines: {
            color:
              colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[2],
          },
          horzLines: {
            color:
              colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[2],
          },
        },
        watermark: {
          visible: false,
        },
      });

      const candlestickSeries = chart.addCandlestickSeries();
      const formattedData = data
        .map(
          (item: {
            dateTime: string;
            startPrice: number;
            highestPrice: number;
            lowestPrice: number;
            endPrice: number;
          }) => ({
            time: (new Date(item.dateTime).getTime() / 1000) as Time,
            open: item.startPrice,
            high: item.highestPrice,
            low: item.lowestPrice,
            close: item.endPrice,
          })
        )
        .sort((a, b) => (a.time as number) - (b.time as number));

      candlestickSeries.setData(formattedData);

      return () => {
        chart.remove();
      };
    }
    return () => {};
  }, [data, colorScheme, theme]);

  return (
    <div className="space-y-4">
      <ChartHeader {...exchange} />

      <Paper p="md" withBorder>
        <div
          ref={chartContainerRef}
          className="w-full h-[400px]"
          role="img"
          aria-label={`Candlestick chart for ${exchange.symbol}`}
        />
      </Paper>
    </div>
  );
}
