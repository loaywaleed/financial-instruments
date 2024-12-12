"use client";
import React from "react";
import { Text, Container, Group, Box } from "@mantine/core";
import { useMantineColorScheme, useMantineTheme } from "@mantine/core";

export function Footer() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Box
      component="footer"
      h={60}
      style={{
        backgroundColor:
          colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        borderTop: `1px solid ${
          colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
      }}
    >
      <Container size="xl" h="100%">
        <Group justify="space-between" h="100%" px="md">
          <Text size="sm" c="dimmed">
            © 2024 Financial Instruments. All rights reserved.
          </Text>
          <Group gap="lg">
            <Text
              component="a"
              href="#"
              size="sm"
              c="dimmed"
              style={{ cursor: "pointer" }}
            >
              Terms
            </Text>
            <Text
              component="a"
              href="#"
              size="sm"
              c="dimmed"
              style={{ cursor: "pointer" }}
            >
              Privacy
            </Text>
            <Text
              component="a"
              href="#"
              size="sm"
              c="dimmed"
              style={{ cursor: "pointer" }}
            >
              Contact
            </Text>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
