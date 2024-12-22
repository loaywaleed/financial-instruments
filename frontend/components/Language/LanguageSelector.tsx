import React from "react";
import { Menu, ActionIcon } from "@mantine/core";
import { Globe } from "lucide-react";
import { useLanguage } from "hooks/useLanguage";

const LANGUAGES = {
  en: "English",
  de: "Deutsch",
} as const;

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="default" size="lg" aria-label="Select language">
          <Globe size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {Object.entries(LANGUAGES).map(([code, name]) => (
          <Menu.Item
            key={code}
            onClick={() => setLanguage(code)}
            className={
              language === code ? "bg-brand-50 dark:bg-brand-900/20" : ""
            }
          >
            {name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
