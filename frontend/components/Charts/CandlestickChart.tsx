"use client";
import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { Paper } from "@mantine/core";
import { useMantineColorScheme, useMantineTheme } from "@mantine/core";

export function CandlestickChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  useEffect(() => {
    if (chartContainerRef.current) {
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

      const data = [
        { time: "2024-01-01", open: 100, high: 105, low: 95, close: 102 },
        { time: "2024-01-02", open: 102, high: 108, low: 100, close: 105 },
      ];

      candlestickSeries.setData(data);

      return () => {
        chart.remove();
      };
    }
    return () => {};
  }, []);

  return (
    <Paper p="md" style={{ width: "100%", height: 400 }}>
      <div ref={chartContainerRef} style={{ width: "100%", height: "100%" }} />
    </Paper>
  );
}
