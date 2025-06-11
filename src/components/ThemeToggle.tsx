
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
      className={`backdrop-blur-xl border rounded-xl transition-all duration-300 transform hover:scale-105 ${
        darkMode 
          ? 'bg-slate-800/50 border-slate-600/60 text-slate-200 hover:bg-slate-700/60 shadow-lg shadow-slate-900/20' 
          : 'bg-white/70 border-slate-300/60 text-slate-700 hover:bg-white/90 shadow-md shadow-slate-400/10'
      }`}
    >
      {darkMode ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};
