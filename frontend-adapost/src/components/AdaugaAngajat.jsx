import Formular from "../layouts/Formular";
import { useParams } from "react-router-dom";

export default function AdaugaAngajat() {
  const { id } = useParams();
  const schemaAngajat = {
    titlu: "Adauga Angajat",
    method: "POST",
    endpoint: `http://localhost:3000/api/adaposturi/${id}/angajati`,
    campuri: [
      {
        nume: "numeAngajat",
        label: "Nume",
        tip: "text",
        required: true,
      },
      {
        nume: "prenume",
        label: "Prenume",
        tip: "text",
        required: true,
      },
      {
        nume: "telefon",
        label: "Nr Telefon",
        tip: "text",
        required: true,
      },
      {
        nume: "functie",
        label: "Functie",
        tip: "text",
        required: true,
      },
      {
        nume: "salariu",
        label: "Salariu",
        tip: "text",
        required: true,
      },
    ],
  };
  return <Formular schema={schemaAngajat} />;
}
