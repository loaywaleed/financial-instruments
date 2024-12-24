import React from "react";
import { Group, Text, Paper } from "@mantine/core";
import { MetadataType } from "types/MetadataType";

export function InstrumentCategory(metadata: MetadataType) {
  return (
    <Paper p="md" mt="md" withBorder>
      <Group justify="space-between">
        <Text size="lg" fw={600} w={"100%"}>
          Category
        </Text>
        <div>
          <Group mb={4} w="100%">
            <Text size="lg" fw={600}>
              {metadata.type}
            </Text>
            <Text size="lg" fw={500}>
              ({metadata.sector})
            </Text>
            <Text size="lg" c="dimmed">
              {metadata.industry}
            </Text>
          </Group>
        </div>
      </Group>
    </Paper>
  );
}
