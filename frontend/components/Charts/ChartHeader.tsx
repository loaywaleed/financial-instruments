import React from "react";
import { Group, Paper, Text } from "@mantine/core";
import { Exchange } from "types/index";

export function ChartHeader(exchange: Exchange) {
  return (
    <Paper p="md" mb="md" withBorder>
      <Group justify="space-between">
        <div>
          <Group mb={4}>
            <Text size="xl" fw={600}>
              {exchange.symbol}
            </Text>
          </Group>
          <Text size="sm" c="dimmed">
            {exchange.name}
          </Text>
          <Text size="sm" c="dimmed">
            {exchange.nameExchange} ({exchange.codeExchange})
          </Text>
        </div>
        <div className="text-right">
          <Text size="xl" fw={600}>
            ${exchange.price}
          </Text>
        </div>
      </Group>
    </Paper>
  );
}
