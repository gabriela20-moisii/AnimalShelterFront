import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Plus, MapPin, PawPrint, Loader2, Globe } from "lucide-react";

export default function ShelterList() {
  const navigate = useNavigate();
  const [searchTerm = ""] = useOutletContext() || [];
  const [adaposturi, setAdaposturi] = useState([]);
  const [incarcare, setIncarcare] = useState(true);
  const [eroare, setEroare] = useState(null);

  useEffect(() => {
    const fetchAdaposturi = async () => {
      try {
        setIncarcare(true);
        const response = await fetch("${import.meta.env.VITE_API_URL}/api/adaposturi");
        if (!response.ok) {
          throw new Error("Eroare la conexiunea cu serverul");
        }
        const data = await response.json();
        setAdaposturi(data);
      } catch (e) {
        setEroare(e.message);
      } finally {
        setIncarcare(false);
      }
    };
    fetchAdaposturi();
  }, []);

  const adaposturiFiltrate = adaposturi.filter(
    (a) =>
      a.numeAdapost.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.numeOras.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.numeTara.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (incarcare) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-paw-900">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-bold text-lg">Se incarca adaposturile...</p>
      </div>
    );
  }

  if (eroare) {
    return (
      <div className="bg-red-50 text-red-700 p-8 rounded-2xl border border-red-100 text-center">
        <p className="font-bold text-xl mb-2">Eroare: {eroare}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        <p className="text-sm text-gray-500 font-medium mt-1">
          {adaposturiFiltrate.length} adaposturi gasite
        </p>
        <button
          onClick={() => navigate("/adauga-adapost")}
          className="flex items-center gap-2 bg-paw-900 hover:bg-paw-800 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm"
        >
          <Plus size={20} />
          Adauga Adapost
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adaposturiFiltrate.length === 0 ? (
          <div className="col-span-full py-16 text-center text-gray-400">
            <PawPrint size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-bold text-paw-900">
              Nu am gasit rezultate.
            </p>
            <p className="text-sm">Incearca sa schimbi termenul de cautare</p>
          </div>
        ) : (
          adaposturiFiltrate.map((adapost) => (
            <div
              key={adapost.idAdapost}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="h-32 bg-paw-50 flex items-center justify-center border-b border-paw-100/50">
                <PawPrint size={48} className="text-paw-200" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-3 truncate">
                  {adapost.numeAdapost}
                </h3>
                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2 text-gray-600 text-sm">
                    <MapPin
                      size={16}
                      className="mt-0.5 shrink-0 text-paw-500"
                    />
                    <span className="line-clamp-2 leading-tight">
                      {adapost.adresa}, {adapost.numeOras}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                    <Globe size={16} className="text-paw-400" />
                    <span>{adapost.numeTara}</span>
                  </div>
                </div>
                <div className="mt-auto pt-2 flex justify-center">
                  <button
                    onClick={() => navigate(`/adapost/${adapost.idAdapost}`)}
                    className="w-[80%] bg-paw-300 hover:bg-paw-800 text-white py-3 rounded-xl font-extrabold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Detalii →
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
