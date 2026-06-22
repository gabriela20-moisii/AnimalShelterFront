import { Outlet } from "react-router-dom";
import { PawPrint, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainLayout() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-paw-bg">
      <header className="bg-paw-900 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            className="flex items-center gap-3"
            onClick={() => navigate("/")}
          >
            <PawPrint className="w-10 h-10" strokeWidth={1.5} />
            <div>
              <h1 className="text-xl font-bold tracking-wider">
                AnimalShelter
              </h1>
              <p className="text-xs text-paw-200">Adaposturi Animale</p>
            </div>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Caută adăpost..."
              className="w-full bg-white/10 border border-paw-700 rounded-xl pl-10 pr-4 py-2 outline-none focus:border-white focus:bg-white/20 transition-all text-white placeholder-white text-sm"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 mt-4">
        <Outlet context={[searchTerm]} />
      </main>
    </div>
  );
}
