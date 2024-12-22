"use client";
import { useState, useEffect } from "react";

export function useLanguage() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  return { language, setLanguage };
}
