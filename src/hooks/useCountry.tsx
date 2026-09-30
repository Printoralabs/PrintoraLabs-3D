import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Country } from "../types";
import { countries, defaultCountry } from "../data/countries";

interface CountryContextValue {
  country: Country;
  setCountryCode: (code: string) => void;
  countries: Country[];
}

const CountryContext = createContext<CountryContextValue | null>(null);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<Country>(() => {
    try {
      const saved = localStorage.getItem("printora_country");
      if (saved) {
        const found = countries.find((c) => c.code === saved);
        if (found) return found;
      }
    } catch {
      /* ignore */
    }
    return defaultCountry;
  });

  const setCountryCode = (code: string) => {
    const found = countries.find((c) => c.code === code) || defaultCountry;
    setCountry(found);
    try {
      localStorage.setItem("printora_country", found.code);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {}, []);

  return (
    <CountryContext.Provider value={{ country, setCountryCode, countries }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used within CountryProvider");
  return ctx;
}
