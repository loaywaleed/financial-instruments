import React from "react";
import {
  Group,
  ActionIcon,
  Title,
  Container,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import { LineChart, Sun, Moon, MenuIcon } from "lucide-react";
import { LanguageSelector } from "components/Language/LanguageSelector";

interface HeaderProps {
  onMenuClick?: () => void;
  isMobile?: boolean;
}

export function Header({ onMenuClick, isMobile = false }: HeaderProps) {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const iconSize = isMobile ? 20 : 24;
  const actionIconSize = isMobile ? "md" : "lg";

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
        <Group justify="space-between" h="100%" px={isMobile ? "xs" : "md"}>
          <Group>
            {isMobile && (
              <ActionIcon
                variant="subtle"
                onClick={onMenuClick}
                aria-label="Toggle menu"
                size={actionIconSize}
              >
                <MenuIcon size={iconSize} color="Black" />
              </ActionIcon>
            )}
            <LineChart size={iconSize} />
            <Title order={isMobile ? 4 : 3}>Financial Instruments</Title>
          </Group>

          <Group gap={isMobile ? "xs" : "sm"}>
            <LanguageSelector />
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size={actionIconSize}
              aria-label="Toggle color scheme"
            >
              {colorScheme === "dark" ? (
                <Sun size={isMobile ? 16 : 18} />
              ) : (
                <Moon size={isMobile ? 16 : 18} />
              )}
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
