"use client";
import React from "react";
import { Box, Text } from "@mantine/core";

export function SidebarHeader() {
  return (
    <Box className="p-4 border-b border-gray-200 dark:border-gray-700">
      <Text size="lg" fw={600}>
        Markets
      </Text>
      <Text size="sm" c="dimmed">
        Browse available instruments
      </Text>
    </Box>
  );
}
