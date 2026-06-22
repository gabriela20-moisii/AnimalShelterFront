import Formular from "../layouts/Formular";
import { useParams } from "react-router-dom";

export default function AdaugaVizita() {
  const { idAdapost, idAngajat } = useParams();
  const schemaVizita = {
    titlu: "Adauga Vizita",
    method: "POST",
    endpoint: `${import.meta.env.VITE_API_URL}/api/adaposturi/${idAdapost}/angajati/${idAngajat}`,
    campuri: [
      {
        nume: "orasVizitat",
        label: "Oras Vizitat",
        tip: "text",
        placeholder: "ex. Paris",
        required: true,
      },
      {
        nume: "durataZile",
        label: "Durata Vizita",
        tip: "text",
        placeholder: "nr zile",
        required: true,
      },
      {
        nume: "motiv",
        label: "Motiv",
        tip: "text",
        placeholder: "ex. Schimb Experienta",
        required: true,
      },
      {
        nume: "dataVizita",
        label: "Data Inceput Vizita",
        tip: "text",
        placeholder: "2025-10-9",
        required: true,
      },
    ],
  };
  return <Formular schema={schemaVizita} />;
}
