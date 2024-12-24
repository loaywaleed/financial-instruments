import React from "react";
import { Group, Text, Paper } from "@mantine/core";
import { MetadataType } from "types/MetadataType";

export function Identification(metadata: MetadataType) {
  return (
    <Paper p="md" mt="md" withBorder>
      <Group justify="space-between">
        <Text size="lg" fw={600} w={"100%"}>
          Metadata
        </Text>
        <div>
          <Group mb={4} w="100%">
            <Text size="lg" fw={600}>
              {metadata.name}
            </Text>
            <Text size="lg" fw={500}>
              ({metadata.ticker})
            </Text>
          </Group>
          <Text size="lg" c="dimmed">
            {metadata.ISIN}
          </Text>
          <Text size="lg" c="dimmed">
            {metadata.description}
          </Text>
        </div>
        <div className="text-right">
          <Text
            size="lg"
            fw={600}
            component="a"
            href={metadata.webUrl}
            target="_blank"
            c="blue"
            td="underline"
          >
            Visit Website
          </Text>
        </div>
      </Group>
    </Paper>
  );
}
