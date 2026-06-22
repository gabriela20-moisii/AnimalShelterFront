import Formular from "../layouts/Formular";
import { useParams } from "react-router-dom";

export default function AdaugaInterventie() {
  const { idAdapost, idAnimal } = useParams();

  const schemaInterventie = {
    titlu: "Adauga Interventie",
    endpoint: `${import.meta.env.VITE_API_URL}/api/adaposturi/${idAdapost}/animale/${idAnimal}/adauga-interventie`,
    method: "POST",
    campuri: [
      {
        nume: "numeMedic",
        label: "Nume Medic",
        tip: "text",
        required: "true",
      },
      {
        nume: "prenumeMedic",
        label: "Prenume Medic",
        tip: "text",
        required: "true",
      },
      {
        nume: "tipInterventie",
        label: "Tip Interventie",
        tip: "text",
        required: "true",
      },
      {
        nume: "observatii",
        label: "Observatii",
        tip: "text",
      },
      {
        nume: "data",
        label: "Data Interventie",
        tip: "text",
        placeholder: "2026-4-9",
        required: "true",
      },
    ],
  };
  return <Formular schema={schemaInterventie} />;
}
