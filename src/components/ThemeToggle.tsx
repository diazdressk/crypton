import { useTheme } from "../contexts/ThemeContext";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="fixed top-4 right-4 flex items-center gap-2">
      <Label htmlFor="theme-toggle">
        {theme === 'light' ? '☀️' : '🌙'}
      </Label>
      <Switch
        id="theme-toggle"
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
      />
    </div>
  );
}