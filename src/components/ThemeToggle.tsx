
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export const ThemeToggle = ({ darkMode, setDarkMode }: ThemeToggleProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setDarkMode(!darkMode)}
      className="bg-slate-800/50 dark:bg-slate-800/50 light:bg-white/80 border-slate-600 dark:border-slate-600 light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-700 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-100 transition-colors"
    >
      {darkMode ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};
