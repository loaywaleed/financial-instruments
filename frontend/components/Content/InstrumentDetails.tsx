"use client";
import React from "react";
import { Paper, Text, Group, Stack, Badge } from "@mantine/core";
import { Instrument } from "../../types";

interface InstrumentDetailsProps {
  instrument: Instrument;
}

export function InstrumentDetails({ instrument }: InstrumentDetailsProps) {
  return (
    <Paper p="md" withBorder>
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            {instrument.name}
          </Text>
          <Badge>{instrument.type}</Badge>
        </Group>
        <Text c="dimmed">{instrument.description}</Text>
        <Text size="lg" fw={500}>
          Exchanges
        </Text>
        {instrument.exchanges.map((exchange) => (
          <Paper key={exchange.id} p="sm" withBorder>
            <Group justify="space-between">
              <Text>{exchange.name}</Text>
              <Group>
                <Text fw={500}>${exchange.price.toLocaleString()}</Text>
                <Badge color={exchange.change >= 0 ? "green" : "red"}>
                  {exchange.change}%
                </Badge>
              </Group>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}
