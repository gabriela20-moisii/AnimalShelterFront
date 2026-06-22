import { useState, useEffect } from "react";
import {
  PawPrint,
  Users,
  BarChart3,
  Wallet,
  Search,
  MapPin,
  Filter,
  Loader2,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  TrendingDown,
  TrendingUp,
  Phone,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const getSpecieEmoji = (specie) => {
  const emojiMap = {
    Caine: "🐶",
    Pisica: "🐱",
    Iepure: "🐰",
    Hamster: "🐹",
    "Porcusor de guineea": "🐹",
    Papagal: "🦜",
    Canar: "🐦",
    "Broasca testoasa": "🐢",
    Iguana: "🦎",
    Chinchilla: "🐭",
    Cal: "🐴",
    Magar: "🫏",
    Capra: "🐐",
    Oaie: "🐑",
    "Porc spinos": "🦔",
  };
  return emojiMap[specie] || "🐾";
};

export default function AdapostDetalii() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabActiv, setTabActiv] = useState("animale");

  const [searchTerm, setSearchTerm] = useState("");
  const [filtruSpecie, setFiltruSpecie] = useState("Toate");
  const [filtruStatus, setFiltruStatus] = useState("Toate");

  const [adapostInfo, setAdapostInfo] = useState(null);
  const [animale, setAnimale] = useState([]);
  const [statistici, setStatistici] = useState([]);
  const [angajati, setAngajati] = useState([]);
  const [plati, setPlati] = useState([]);
  const [venituri, setVenituri] = useState([]);
  const [specii, setSpecii] = useState([]);

  const [subTabFinante, setSubTabFinante] = useState("plati");

  const [incarcare, setIncarcare] = useState(true);
  const [eroare, setEroare] = useState(null);

  useEffect(() => {
    const fetchDateAdapost = async () => {
      try {
        setIncarcare(true);
        const [
          resAdapost,
          resAnimale,
          resAngajati,
          resStatistici,
          resPlati,
          resVenituri,
          resSpecie,
        ] = await Promise.all([
          fetch(`http://localhost:3000/api/adaposturi/${id}`),
          fetch(`http://localhost:3000/api/adaposturi/${id}/animale`),
          fetch(`http://localhost:3000/api/adaposturi/${id}/angajati`),
          fetch(`http://localhost:3000/api/adaposturi/${id}/statistics`),
          fetch(`http://localhost:3000/api/adaposturi/${id}/payments`),
          fetch(`http://localhost:3000/api/adaposturi/${id}/income`),
          fetch(`http://localhost:3000/api/specii`),
        ]);

        if (!resAdapost.ok || !resAnimale.ok) {
          throw new Error("Eroare la aducerea datelor.");
        }

        const dateAdapost = await resAdapost.json();
        const dateAnimale = await resAnimale.json();
        const dateAngajati = await resAngajati.json();
        const dateStatistici = await resStatistici.json();
        const datePlati = await resPlati.json();
        const dateVenituri = await resVenituri.json();
        const dateSpecii = await resSpecie.json();

        setAdapostInfo(dateAdapost);
        setAnimale(dateAnimale);
        setAngajati(dateAngajati);
        setStatistici(dateStatistici);
        setPlati(datePlati);
        setVenituri(dateVenituri);
        setSpecii(dateSpecii);
      } catch (e) {
        setEroare(e.message);
      } finally {
        setIncarcare(false);
      }
    };
    fetchDateAdapost();
  }, [id]);

  const animaleFiltrate = animale.filter((animal) => {
    const matchSearch =
      (animal.numeAnimal || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (animal.numeRasa || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchSpecie =
      filtruSpecie === "Toate" || animal.numeSpecie === filtruSpecie;
    const matchStatus =
      filtruStatus === "Toate" || animal.status === filtruStatus;
    return matchSearch && matchSpecie && matchStatus;
  });

  const getStatusClass = (status) =>
    status === "Disponibil"
      ? "bg-paw-100 text-paw-900 border border-paw-200"
      : "bg-gray-100 text-gray-700 border border-gray-200";

  if (incarcare)
    return (
      <div className="flex h-screen bg-paw-bg items-center justify-center flex-col text-paw-900">
        <Loader2 className="w-16 h-16 animate-spin mb-4" />
        <h2 className="text-xl font-bold">Se Incarca datele...</h2>
      </div>
    );

  if (eroare)
    return (
      <div className="flex h-screen bg-paw-bg items-center justify-center p-8 text-center text-red-600">
        <h2 className="font-bold text-2xl">{eroare}</h2>
      </div>
    );

  return (
    <div className="flex h-screen bg-paw-bg overflow-hidden text-gray-800">
      <aside className="w-80 bg-white border-r border-paw-100 flex flex-col shrink-0 p-6 shadow-sm z-10">
        <div className="flex items-center gap-3 mb-10 text-paw-900">
          <PawPrint className="w-14 h-14" strokeWidth={1.5} />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">
              AnimalShelter
            </h1>
            <p className="text-sm font-medium text-paw-700">Adaposturi</p>
          </div>
        </div>

        <div className="mb-10 space-y-3 bg-paw-50/50 p-4 rounded-xl border border-paw-100">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-5 h-5 text-paw-500 mt-1 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-paw-900">
                {adapostInfo.numeAdapost}
              </h2>
              <p className="text-sm text-gray-600 leading-tight mt-0.5">
                {adapostInfo.adresa}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {["animale", "oameni", "statistici", "finante"].map((tab) => (
            <button
              key={tab}
              onClick={() => setTabActiv(tab)}
              className={`w-full flex items-center gap-3.5 px-5 py-3 rounded-xl font-bold transition-all capitalize ${
                tabActiv === tab
                  ? "bg-paw-900 text-white shadow-lg shadow-paw-900/30"
                  : "text-gray-600 hover:bg-paw-50 hover:text-paw-900"
              }`}
            >
              {tab === "animale" && <PawPrint className="w-5 h-5 shrink-0" />}
              {tab === "oameni" && <Users className="w-5 h-5 shrink-0" />}
              {tab === "statistici" && (
                <BarChart3 className="w-5 h-5 shrink-0" />
              )}
              {tab === "finante" && <Wallet className="w-5 h-5 shrink-0" />}
              {tab}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white p-6 border-b border-gray-100 flex items-center justify-between gap-6 shrink-0 shadow-sm z-0">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-paw-900">
              {tabActiv === "animale" && "Lista Animale"}
              {tabActiv === "oameni" && "Echipa Adapostului"}
              {tabActiv === "statistici" && "Statistici"}
              {tabActiv === "finante" && "Finante"}
            </h1>
          </div>

          {tabActiv === "animale" && (
            <div className="flex items-center gap-3 flex-1 justify-end">
              <div className="flex items-center bg-paw-50 border border-paw-100 rounded-xl px-3 py-2.5">
                <Filter className="w-4 h-4 text-paw-400 mr-2" />
                <select
                  value={filtruSpecie}
                  onChange={(e) => setFiltruSpecie(e.target.value)}
                  className="bg-transparent outline-none text-sm font-semibold text-paw-900 cursor-pointer"
                >
                  <option value="Toate">Toate Speciile</option>
                  {specii.map((s, idx) => (
                    <option key={idx} value={s.nume}>
                      {s.nume}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center bg-paw-50 border border-paw-100 rounded-xl px-3 py-2.5">
                <Filter className="w-4 h-4 text-paw-400 mr-2" />
                <select
                  value={filtruStatus}
                  onChange={(e) => setFiltruStatus(e.target.value)}
                  className="bg-transparent outline-none text-sm font-semibold text-paw-900 cursor-pointer"
                >
                  <option value="Toate">Orice Status</option>
                  <option value="adapost">In adapost</option>
                  <option value="adoptat">Adoptat</option>
                </select>
              </div>
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-paw-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cauta nume sau rasa..."
                  className="w-full bg-paw-50 border border-paw-100 rounded-xl pl-12 pr-4 py-2.5 outline-none focus:border-paw-500 focus:bg-white transition-colors text-paw-900 placeholder-paw-400 font-medium"
                />
              </div>
            </div>
          )}

          {tabActiv !== "statistici" && (
            <button
              onClick={() => {
                if (tabActiv === "animale")
                  navigate(`/adapost/${id}/adauga-animal`);
                else if (tabActiv === "oameni")
                  navigate(`/adapost/${id}/adauga-angajat`);
                else if (tabActiv === "finante") {
                  navigate(
                    subTabFinante === "plati"
                      ? `/adapost/${id}/adauga-plata`
                      : `/adapost/${id}/adauga-venit`,
                  );
                }
              }}
              className="flex items-center gap-2 bg-paw-300 hover:bg-paw-500 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm ml-2 shrink-0"
            >
              <Plus size={20} /> Adauga
            </button>
          )}
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {tabActiv === "animale" && (
            <>
              {animaleFiltrate.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-paw-400">
                  <PawPrint className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg font-bold text-paw-900">
                    Nu am gasit niciun animal!
                  </p>
                  <p className="text-sm">
                    Incearca sa schimbi filtrele sau termenul cautat
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {animaleFiltrate.map((animal) => (
                    <div
                      key={animal.idAnimal}
                      className="bg-white p-5 rounded-2xl shadow-sm border border-paw-100 flex flex-col gap-4 hover:shadow-md transition-shadow"
                    >
                      <div className="h-40 bg-paw-50 rounded-xl flex items-center justify-center text-5xl border border-paw-100/50">
                        {getSpecieEmoji(animal.numeSpecie)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-paw-900">
                          {animal.numeAnimal}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {animal.numeSpecie}, {animal.numeRasa}
                        </p>
                        <div
                          className={`inline-block mt-3 text-xs font-bold px-3 py-1 rounded-full ${getStatusClass(animal.status)}`}
                        >
                          {animal.status}
                        </div>
                      </div>
                      <button
                        className="w-full bg-paw-300 hover:bg-paw-500 text-white font-bold py-2.5 rounded-xl transition-colors shadow-sm"
                        onClick={() =>
                          navigate(`/adapost/${id}/animale/${animal.idAnimal}`)
                        }
                      >
                        Detalii →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tabActiv === "oameni" && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {angajati.map((persoana) => (
                <div
                  key={persoana.idAngajat}
                  onClick={() =>
                    navigate(`/adapost/${id}/angajat/${persoana.idAngajat}`)
                  }
                  className="bg-white p-5 rounded-2xl shadow-sm border border-paw-100 flex items-center gap-5 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-16 h-16 bg-paw-900 text-white font-extrabold text-2xl rounded-full flex items-center justify-center shrink-0 shadow-inner">
                    {persoana.numeAngajat.charAt(0)}
                    {persoana.prenume.charAt(0)}
                  </div>
                  <div className="overflow-hidden flex-1">
                    <h3 className="font-bold text-lg text-paw-900 truncate">
                      {persoana.numeAngajat} {persoana.prenume}
                    </h3>
                    <p className="text-sm text-paw-500 font-medium">
                      {persoana.functie}
                    </p>
                    <p className="text-sm text-gray-600 font-bold mt-1.5 flex items-center gap-1.5">
                      <Phone size={12} /> {persoana.telefon}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tabActiv === "statistici" && (
            <div className="bg-white rounded-3xl shadow-sm border border-paw-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-paw-50/50 text-paw-900 border-b border-paw-100">
                    <tr>
                      <th className="p-5 font-bold uppercase tracking-wider text-xs">
                        Specie & Rasa
                      </th>
                      <th className="p-5 font-bold uppercase tracking-wider text-xs text-center">
                        Intrate
                      </th>
                      <th className="p-5 font-bold uppercase tracking-wider text-xs text-center">
                        Adoptate
                      </th>
                      <th className="p-5 font-bold uppercase tracking-wider text-xs text-center">
                        Rata Succes
                      </th>
                      <th className="p-5 font-bold uppercase tracking-wider text-xs text-center">
                        Timp Asteptare
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {statistici.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="p-8 text-center text-gray-400 font-medium"
                        >
                          Nu exista date statistice disponibile Inca.
                        </td>
                      </tr>
                    ) : (
                      statistici.map((s, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-2xl shadow-sm shrink-0">
                              {getSpecieEmoji(s.numeSpecie)}
                            </div>
                            <div>
                              <p className="font-bold text-gray-800 text-base">
                                {s.numeRasa}
                              </p>
                              <p className="text-sm text-gray-500 font-medium">
                                {s.numeSpecie}
                              </p>
                            </div>
                          </td>
                          <td className="p-5 text-center font-extrabold text-gray-700 text-lg">
                            {s.totalAnimaleIntrate}
                          </td>
                          <td className="p-5 text-center font-extrabold text-paw-700 text-lg">
                            {s.totalAdoptiiRealizate}
                          </td>
                          <td className="p-5 text-center">
                            <span
                              className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold w-16 ${
                                s.rataAdoptieProcent >= 50
                                  ? "bg-green-100 text-green-700"
                                  : s.rataAdoptieProcent > 0
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-50 text-red-600"
                              }`}
                            >
                              {s.rataAdoptieProcent}%
                            </span>
                          </td>
                          <td className="p-5 text-center font-medium text-gray-600">
                            {s.timpMediuAsteptareZile}{" "}
                            {s.timpMediuAsteptareZile === 1 ? "zi" : "zile"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tabActiv === "finante" && (
            <div className="space-y-6">
              {(() => {
                const totalPlati = (plati || []).reduce(
                  (acc, p) => acc + (p.suma || 0),
                  0,
                );
                const totalVenituri = (venituri || []).reduce(
                  (acc, v) => acc + (v.suma || 0),
                  0,
                );
                const balanta = totalVenituri - totalPlati;
                const dateDeAfisat =
                  subTabFinante === "plati" ? plati || [] : venituri || [];

                return (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-3xl shadow-sm border transition-all flex items-center gap-4 ">
                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shrink-0">
                          <TrendingDown size={24} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">
                            Total Cheltuieli
                          </p>
                          <p className="text-2xl font-black text-gray-900">
                            {totalPlati}{" "}
                            <span className="text-sm font-medium text-gray-400">
                              RON
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-3xl shadow-sm border transition-all flex items-center gap-4 ">
                        <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center shrink-0">
                          <TrendingUp size={24} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">
                            Total Venituri
                          </p>
                          <p className="text-2xl font-black text-gray-900">
                            {totalVenituri}{" "}
                            <span className="text-sm font-medium text-gray-400">
                              RON
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-3xl shadow-sm border transition-all flex items-center gap-4 ">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                          <Wallet size={24} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-paw-200 uppercase">
                            Balanta Neta
                          </p>
                          <p className="text-2xl font-black">
                            {balanta.toLocaleString("ro-RO")}{" "}
                            <span className="text-sm font-medium text-paw-300">
                              RON
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-2 rounded-2xl border border-paw-100">
                      <div className="flex gap-1 w-full sm:w-auto">
                        <button
                          onClick={() => setSubTabFinante("plati")}
                          className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            subTabFinante === "plati"
                              ? "bg-red-500 text-white shadow-md shadow-red-200"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          <ArrowDownRight size={18} /> Plati
                        </button>
                        <button
                          onClick={() => setSubTabFinante("venituri")}
                          className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            subTabFinante === "venituri"
                              ? "bg-green-500 text-white shadow-md shadow-green-200"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          <ArrowUpRight size={18} /> Venituri
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-paw-100 overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 text-gray-400 border-b border-gray-100">
                          <tr>
                            <th className="p-5 font-bold uppercase tracking-wider text-[10px]">
                              Detalii Document
                            </th>
                            <th className="p-5 font-bold uppercase tracking-wider text-[10px]">
                              Data
                            </th>
                            <th className="p-5 font-bold uppercase tracking-wider text-[10px] text-right">
                              Suma (RON)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {dateDeAfisat.length === 0 ? (
                            <tr>
                              <td
                                colSpan="4"
                                className="p-10 text-center text-gray-400 font-medium italic"
                              >
                                Nu exista date Inregistrate momentan.
                              </td>
                            </tr>
                          ) : (
                            dateDeAfisat.map((item, idx) => (
                              <tr
                                key={idx}
                                className="hover:bg-paw-50/30 transition-colors group"
                              >
                                <td className="p-5">
                                  <p className="font-bold text-gray-800 group-hover:text-paw-900 transition-colors">
                                    {item.descriere}
                                  </p>
                                </td>
                                <td className="p-5 text-sm font-medium text-gray-500">
                                  {item.dataFactura || item.dataIncasare}
                                </td>
                                <td
                                  className={`p-5 text-right font-black text-lg text-paw-900`}
                                >
                                  {item.suma}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
