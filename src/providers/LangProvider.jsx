import React, { useState, useEffect } from "react";
import { LangContext } from "./LangContext";
import en from "../locales/en";
import id from "../locales/id";

const translations = { en, id };

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}
