import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  // apply/remove dark mode on body
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <header className="w-full bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
            alt="Pokémon Logo"
            className="h-10"
          />
          <h1 className="text-2xl font-extrabold tracking-wide text-white drop-shadow">
            Pokémon Dashboard
          </h1>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
