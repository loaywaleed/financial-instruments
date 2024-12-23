import React from "react";
import { TextInput } from "@mantine/core";
import { Search } from "lucide-react";

interface SidebarSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function SidebarSearch({ value, onChange }: SidebarSearchProps) {
  return (
    <TextInput
      placeholder="Search instruments..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      leftSection={<Search size={16} />}
      className="p-2"
    />
  );
}
