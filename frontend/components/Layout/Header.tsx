"use client";
import React from "react";
import {
  Group,
  ActionIcon,
  Title,
  Container,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import { LineChart, Sun, Moon } from "lucide-react";

export function Header() {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Box
      component="header"
      h={60}
      style={(theme) => ({
        backgroundColor:
          colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        borderBottom: `1px solid ${
          colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
      })}
    >
      <Container size="xl" h="100%">
        <Group justify="space-between" h="100%">
          <Group>
            <LineChart size={24} />
            <Title order={3}>Financial Instruments</Title>
          </Group>

          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size="lg"
            aria-label="Toggle color scheme"
          >
            {colorScheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </ActionIcon>
        </Group>
      </Container>
    </Box>
  );
}
