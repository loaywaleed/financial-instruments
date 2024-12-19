"use client";
import React, { useEffect, useRef, useState } from "react";
import { createChart, Time } from "lightweight-charts";
import { Paper } from "@mantine/core";
import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { api } from "utils/api";

export function CandlestickChart({ symbol }: { symbol: string }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/candles?symbol=${symbol}`);
        const result = await response.data;
        console.log("Candlestick data:", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching candlestick data:", error);
      }
    }

    fetchData();
  }, [symbol]);

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
        .sort((a, b) => a.time - b.time);

      candlestickSeries.setData(formattedData);

      return () => {
        chart.remove();
      };
    }
    return () => {};
  }, [data, colorScheme, theme]);

  return (
    <Paper p="md" style={{ width: "100%", height: 400 }}>
      <div ref={chartContainerRef} style={{ width: "100%", height: "100%" }} />
    </Paper>
  );
}
