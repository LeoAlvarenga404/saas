import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/contexts/theme-provider";

export function ToggleButton() {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      {isDark ? (
        <Moon size={20} onClick={() => setTheme("light")} />
      ) : (
        <Sun size={20} onClick={() => setTheme("dark")} />
      )}
    </>
  );
}
