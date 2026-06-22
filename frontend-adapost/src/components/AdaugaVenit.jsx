import { use } from "react";
import Formular from "../layouts/Formular";
import { useParams } from "react-router-dom";

export default function AdaugaVenit() {
  const { id } = useParams();
  const schemaVenit = {
    titlu: "Adauga Venit",
    method: "POST",
    endpoint: `http://localhost:3000/api/adaposturi/${id}/income`,
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
        nume: "dataIncasare",
        label: "Data",
        placeholder: "2026-04-01",
        tip: "text",
        required: true,
      },
    ],
  };
  return <Formular schema={schemaVenit} />;
}
