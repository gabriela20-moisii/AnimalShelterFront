import { useState } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Formular({ schema }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [eroare, setEroare] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEroare(null);

    try {
      if (!schema.endpoint) {
        throw new Error("Adresa lipsește din configurația formularului!");
      }

      const response = await fetch(schema.endpoint, {
        method: schema.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Eroare la salvarea datelor în baza de date.");
      }

      navigate(-1);
    } catch (err) {
      setEroare(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paw-bg p-6 md:p-10 font-sans">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-paw-900 font-bold mb-8 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h1 className="text-3xl font-extrabold text-paw-900 mb-8 border-b border-gray-100 pb-4">
            {schema.titlu}
          </h1>

          {eroare && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-bold border border-red-100">
              Eroare: {eroare}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {schema.campuri.map((camp, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  {camp.label}
                </label>

                {camp.tip === "select" ? (
                  <select
                    name={camp.nume}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-paw-300 transition-colors cursor-pointer"
                    required
                  >
                    <option value="">Alege o optiune...</option>
                    {camp.optiuni.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={camp.tip}
                    name={camp.nume}
                    placeholder={camp.placeholder || ""}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-paw-300 transition-colors"
                    required
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-paw-500 hover:bg-paw-700 text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Se salveaza...
                </>
              ) : (
                <>
                  <Save size={20} /> Salvează
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
