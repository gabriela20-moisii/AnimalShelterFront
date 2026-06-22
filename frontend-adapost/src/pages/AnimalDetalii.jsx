import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Heart,
  Stethoscope,
  Truck,
  Calendar,
  Info,
  CheckCircle2,
  Loader2,
  MapPin,
  Syringe,
  Plus,
} from "lucide-react";
import { data, useNavigate, useParams } from "react-router-dom";
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
  return emojiMap[specie];
};

export default function AnimalDetalii() {
  const { idAdapost, idAnimal } = useParams();
  const navigate = useNavigate();
  const [tabActiv, setTabActiv] = useState("medical");
  const [animal, setAnimal] = useState(null);
  const [incarcare, setIncarcare] = useState(true);
  const [eroare, setEroare] = useState(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/adaposturi/${idAdapost}/animale/${idAnimal}`,
        );
        if (!response.ok) {
          throw new Error("Err la obtinerea datelor animal");
        }
        const data = await response.json();
        setAnimal(data);
      } catch (e) {
        setEroare(e.message);
      } finally {
        setIncarcare(false);
      }
    };
    fetchAnimal();
  }, [idAdapost, idAnimal]);

  if (incarcare)
    return (
      <div className="flex h-screen bg-paw-bg items-center justify-center flex-col text-paw-900 font-bold">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p>Se aduce fisa animalului...</p>
      </div>
    );

  if (eroare)
    return (
      <div className="flex h-screen bg-paw-bg items-center justify-center p-10 text-center">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-100">
          <h2 className="text-red-600 font-black text-2xl mb-2">
            Eroare de conexiune
          </h2>
          <p className="text-gray-500 mb-6">{eroare}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-paw-900 text-white px-6 py-2 rounded-xl font-bold"
          >
            Inapoi
          </button>
        </div>
      </div>
    );

  if (!animal) return null;
  const calculeazaVarsta = (dataNastere) => {
    if (!dataNastere) return "Varsta necunoscuta";
    const azi = new Date();
    const nastere = new Date(dataNastere);
    let ani = azi.getFullYear() - nastere.getFullYear();
    let luni = azi.getMonth() - nastere.getMonth();
    if (luni < 0 || (luni === 0 && azi.getDate() < nastere.getDate())) {
      ani--;
      luni += 12;
    }
    if (luni === 12) {
      ani++;
      luni = 0;
    }
    if (ani === 0) {
      if (luni === 0) return "Pui";
      return `${luni} ${luni === 1 ? "luna" : "luni"}`;
    } else if (luni === 0) {
      return `${ani} ${ani === 1 ? "an" : "ani"}`;
    } else {
      return `${ani} ${ani === 1 ? "an" : "ani"} si ${luni} ${luni === 1 ? "luna" : "luni"}`;
    }
  };

  return (
    <div className="min-h-screen bg-paw-bg p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-paw-900 font-bold mb-6 hover:translate-x-1 transition-transform"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-paw-100">
            <div className="py-12 bg-paw-50 flex items-center justify-center text-6xl">
              {getSpecieEmoji(animal.numeSpecie)}
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-extrabold text-paw-900">
                    {animal.numeAnimal}
                  </h1>
                  <p className="text-xl text-paw-500 font-medium">
                    {animal.numeRasa}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-paw-100 overflow-hidden">
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setTabActiv("medical")}
                className={`flex-1 py-4 font-bold flex items-center justify-center gap-2 ${tabActiv === "medical" ? "text-paw-900 bg-paw-50" : "text-gray-400"}`}
              >
                <Stethoscope size={18} />
                Fisa Medicala
              </button>
              <button
                onClick={() => setTabActiv("transfer")}
                className={`flex-1 py-4 font-bold flex items-center justify-center gap-2 ${tabActiv === "transfer" ? "text-paw-900 bg-paw-50" : "text-gray-400"}`} // Corectat din tabActiv === "medical"
              >
                <Truck size={18} />
                Istoric Transfer
              </button>
              <button
                onClick={() => setTabActiv("adoptii")}
                className={`flex-1 py-4 font-bold flex items-center justify-center gap-2 ${tabActiv === "adoptii" ? "text-paw-900 bg-paw-50" : "text-gray-400"}`} // Corectat din tabActiv === "medical"
              >
                <Heart size={18} />
                Istoric Adoptie
              </button>
            </div>
            <div className="p-8">
              {tabActiv === "medical" && (
                <div className="space-y-6">
                  {!animal.istoricMedical ||
                  animal.istoricMedical.length === 0 ? (
                    <p className="text-gray-500 italic">
                      Nu exista inregistrari medicale.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {animal.istoricMedical.map((fisa, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-green-50 border border-green-100" // Am reparat clasa border
                        >
                          <p className="font-bold text-green-900 text-sm mb-1">
                            {fisa.tipInterventie}
                          </p>
                          <div className="text-xs text-green-700 space-y-1">
                            <p>Data: {fisa.data}</p>
                            <p>
                              Medic: Dr. {fisa.prenumeMedic} {fisa.numeMedic}
                            </p>
                            {fisa.observatii && (
                              <p className="italic">Obs: {fisa.observatii}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tabActiv === "transfer" && (
                <div className="space-y-6">
                  {!animal.istoricTransfer ||
                  animal.istoricTransfer.length === 0 ? (
                    <p className="text-gray-500 italic">
                      Nu exista transferuri inregistrate.
                    </p>
                  ) : (
                    <div className="relative border-l-2 border-paw-100 ml-4 pl-8 space-y-8 py-2">
                      {animal.istoricTransfer.map((transfer, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-paw-900 border-4 border-white shadow-sm"></div>
                          <p className="text-xs font-bold text-paw-500 uppercase tracking-wider mb-1">
                            {transfer.dataTransfer}
                          </p>
                          <p className="font-bold text-gray-800 text-base">
                            Din: {transfer.numeAdapostSursa} (
                            {transfer.orasSursa})
                          </p>
                          <p className="font-bold text-gray-600 text-base">
                            In: {transfer.numeAdapostDestinatie} (
                            {transfer.orasDestinatie})
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tabActiv === "adoptii" && (
                <div className="space-y-6">
                  {!animal.istoricAdoptie ||
                  animal.istoricAdoptie.length === 0 ? (
                    <div className="bg-paw-50 rounded-2xl p-6 border border-paw-100 flex gap-4">
                      <Info className="text-paw-900 shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-paw-900 mb-2">
                          Animalul nu a fost adoptat niciodata.
                        </p>
                        <p className="text-gray-600 text-sm">
                          Este disponibil pentru a-si gasi prima familie!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {" "}
                      {animal.istoricAdoptie.map((adoptie, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 border border-gray-100 p-4 rounded-xl"
                        >
                          <p className="font-bold text-gray-800 mb-2">
                            Adoptator: {adoptie.prenumeAdoptator}{" "}
                            {adoptie.numeAdoptator}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                            <p>
                              Data Adoptie:{" "}
                              <span className="font-semibold">
                                {adoptie.dataAdoptie}
                              </span>
                            </p>
                            <p>
                              Telefon:{" "}
                              <span className="font-semibold">
                                {adoptie.telefonAdoptator}
                              </span>
                            </p>
                            <p>
                              Email:{" "}
                              <span className="font-semibold">
                                {adoptie.emailAdoptator}
                              </span>
                            </p>
                          </div>
                          {adoptie.dataReturnare && (
                            <div className="mt-3 pt-3 border-t border-gray-200 text-sm">
                              <p className="text-red-600 font-bold">
                                Returnat la data: {adoptie.dataReturnare}
                              </p>
                              {adoptie.motivReturnare && (
                                <p className="text-gray-600 mt-1">
                                  Motiv: {adoptie.motivReturnare}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-paw-100">
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Specie</span>
                <span className="font-bold text-paw-900">
                  {animal.numeSpecie}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Varsta</span>
                <span className="font-bold text-paw-900">
                  {calculeazaVarsta(animal.dataNastere)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Data Nasterii</span>
                <span className="font-bold text-paw-900">
                  {animal.dataNastere}
                </span>
              </div>
              {animal.status === "adapost" && (
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Cusca</span>
                  <span className="font-bold text-paw-900">
                    {animal.codIdentificareCusca}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Status</span>
                <span className="font-bold text-paw-900">{animal.status}</span>
              </div>
            </div>
            {animal.status === "adapost" ? (
              <button
                className="w-full bg-paw-900 text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-paw-900/30 hover:bg-paw-900/90 transition-all mb-4"
                onClick={() =>
                  navigate(`/adapost/${idAdapost}/animale/${idAnimal}/adoptie`)
                }
              >
                Adoptie
              </button>
            ) : (
              <button
                className="w-full bg-paw-900 text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-paw-900/30 hover:bg-paw-900/90 transition-all mb-4"
                onClick={() =>
                  navigate(`/adapost/${idAdapost}/animale/${idAnimal}/retur`)
                }
              >
                Retur
              </button>
            )}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                onClick={() =>
                  navigate(
                    `/adapost/${idAdapost}/animale/${idAnimal}/interventie-medicala`,
                  )
                }
                className="flex items-center justify-center gap-1 bg-paw-300 text-white font-bold py-3 rounded-xl hover:bg-paw-500 transition-all text-sm shadow-sm"
              >
                Interventie Medicala
              </button>

              <button
                onClick={() =>
                  navigate(`/adapost/${idAdapost}/animale/${idAnimal}/transfer`)
                }
                className="flex items-center justify-center gap-2 bg-paw-300 text-white font-bold py-3 rounded-xl hover:bg-paw-500 transition-all text-sm shadow-sm"
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
