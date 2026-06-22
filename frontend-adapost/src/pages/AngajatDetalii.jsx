import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Loader2,
  BadgeDollarSign,
  Plus,
} from "lucide-react";

export default function AngajatDetalii() {
  const { idAdapost, idAngajat } = useParams();
  const navigate = useNavigate();

  const [angajat, setAngajat] = useState(null);
  const [incarcare, setIncarcare] = useState(true);
  const [eroare, setEroare] = useState(null);

  useEffect(() => {
    const fetchAngajat = async () => {
      try {
        setIncarcare(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/adaposturi/${idAdapost}/angajati/${idAngajat}`,
        );

        if (!response.ok) {
          throw new Error("Eroare la aducerea datelor despre angajat.");
        }
        const data = await response.json();
        setAngajat(data);
      } catch (e) {
        setEroare(e.message);
      } finally {
        setIncarcare(false);
      }
    };
    fetchAngajat();
  }, [idAdapost, idAngajat]);

  if (incarcare)
    return (
      <div className="flex h-screen bg-paw-bg items-center justify-center flex-col text-paw-900 font-bold">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p>Se aduce fisa angajatului...</p>
      </div>
    );

  if (eroare)
    return (
      <div className="flex h-screen bg-paw-bg items-center justify-center p-10 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-100">
          <h2 className="text-red-600 font-black text-2xl mb-2">Eroare</h2>
          <p className="text-gray-500 mb-6">{eroare}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-paw-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-paw-800 transition-colors"
          ></button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-paw-bg p-6 md:p-10 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-paw-400 hover:text-paw-900 font-bold mb-10 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-16">
          <div className="w-28 h-28 bg-paw-900 text-white text-4xl font-black rounded-full flex items-center justify-center shrink-0 shadow-lg">
            {(angajat?.prenume || "A")[0]}
            {(angajat?.numeAngajat || "A")[0]}
          </div>
          <div className="flex-1 text-center md:text-left mt-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-1">
              {angajat?.prenume} {angajat?.numeAngajat}
            </h1>
            <p className="text-sm font-bold text-paw-600 uppercase tracking-widest mb-4">
              {angajat?.functie}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-3 text-gray-600 font-medium text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-paw-400" />
                <span>{angajat?.telefon || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeDollarSign size={16} className="text-paw-400" />
                <span>{`${angajat.salariu} RON`}</span>
              </div>
              <div className="flex items-center gap-2">
                Specializare:
                <span>{angajat.specializare || "N/A"}</span>
              </div>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>{" "}
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-paw-400" />
                <span>
                  Adapost Curent:{" "}
                  <span className="font-bold text-gray-800">
                    {angajat?.numeAdapost}
                  </span>{" "}
                  ({angajat?.numeOras})
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 mt-12">
            <h2 className="text-2xl font-extrabold text-paw-900">
              Istoric Vizite
            </h2>

            <button
              onClick={() =>
                navigate(
                  `/adapost/${idAdapost}/angajat/${idAngajat}/adauga-vizita`,
                )
              }
              className="flex items-center gap-2 bg-paw-300 hover:bg-paw-500 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm shrink-0"
            >
              <Plus size={20} />
              Adauga Vizita
            </button>
          </div>

          {!angajat?.istoricVizite || angajat.istoricVizite.length === 0 ? (
            <div className="py-10 text-gray-400 font-bold italic">
              Acest angajat nu are vizite inregistrate momentan.
            </div>
          ) : (
            <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-4">
              {angajat.istoricVizite.map((vizita, index) => (
                <div key={index} className="relative pl-10">
                  <div className="absolute -left-[15px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-paw-900 border-[4px] border-[#F9F6F0] box-content shadow-sm"></div>

                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                      <div>
                        <h3 className="font-extrabold text-gray-800 text-lg leading-tight">
                          {vizita.numeAdapostVizitat}
                        </h3>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mt-1">
                          <MapPin size={12} /> {vizita.orasVizitat}
                        </p>
                      </div>
                      <div className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-500 flex items-center gap-2 shrink-0">
                        <Calendar size={14} className="text-gray-400" />{" "}
                        {vizita.dataVizita}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-50 pt-4">
                      <div>
                        <span className="block text-[10px] uppercase font-extrabold text-gray-400 tracking-wider mb-1">
                          Durata
                        </span>
                        <span className="font-bold text-gray-700 flex items-center gap-1.5 text-sm">
                          <Clock size={14} className="text-gray-400" />{" "}
                          {vizita.durataZile} zile
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-extrabold text-gray-400 tracking-wider mb-1">
                          Motiv Vizita
                        </span>
                        <span className="font-bold text-gray-700 italic text-sm">
                          "{vizita.motiv || "Nespecificat"}"
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
