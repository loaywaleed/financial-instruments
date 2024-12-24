import React from "react";
import { Group, Paper, Text } from "@mantine/core";
import { Exchange } from "types/exchange";

export function ChartHeader(exchange: Exchange) {
  return (
    <Paper p="md" mb="md" withBorder>
      <Group justify="space-between">
        <Group>
          <img
            src={`https://eodhistoricaldata.com/img/logos/${exchange.codeExchange}/${exchange.ticker}.png`}
            alt={`${exchange.name} logo`}
            style={{ width: 40, height: 40, objectFit: "contain" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div>
            <Group mb={4}>
              <Text size="xl" fw={600}>
                {exchange.name}
              </Text>
              <Text size="l" fw={500}>
                ({exchange.symbol})
              </Text>
            </Group>
            <Text size="sm" c="dimmed">
              {exchange.country}
            </Text>
            <Text size="sm" c="dimmed">
              {exchange.nameExchange} ({exchange.codeExchange})
            </Text>
          </div>
        </Group>
        <div className="text-right">
          <Text size="xl" fw={600}>
            ${exchange.currency}
          </Text>
        </div>
      </Group>
    </Paper>
  );
}
