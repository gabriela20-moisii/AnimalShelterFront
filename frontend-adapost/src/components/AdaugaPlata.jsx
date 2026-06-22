import { use } from "react";
import Formular from "../layouts/Formular";
import { useParams } from "react-router-dom";

export default function AdaugaPlata() {
  const { id } = useParams();
  const schemaPlata = {
    titlu: "Adauga Plata",
    method: "POST",
    endpoint: `${import.meta.env.VITE_API_URL}/api/adaposturi/${id}/payments`,
    campuri: [
      {
        nume: "descriere",
        label: "Descriere",
        placeholder: "Plata furnizori",
        tip: "text",
        required: true,
      },
      {
        nume: "suma",
        label: "Suma",
        placeholder: "RON",
        tip: "text",
        required: true,
      },
      {
        nume: "dataFactura",
        label: "Data",
        placeholder: "2026-04-01",
        tip: "text",
        required: true,
      },
    ],
  };
  return <Formular schema={schemaPlata} />;
}
