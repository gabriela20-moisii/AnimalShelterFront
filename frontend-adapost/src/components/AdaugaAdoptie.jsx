import Formular from "../layouts/Formular";
import { useParams } from "react-router-dom";

export default function AdaugaAdoptie() {
  const { idAnimal, idAdapost } = useParams();
  const schemaAdoptie = {
    titlu: "Inroleaza Adoptie",
    method: "POST",
    endpoint: `http://localhost:3000/api/adaposturi/${idAdapost}/animale/${idAnimal}/adoptie`,
    campuri: [
      {
        nume: "nume",
        label: "Nume Adoptator",
        tip: "text",
        required: true,
      },
      {
        nume: "prenume",
        label: "Prenume Adoptator",
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
        nume: "email",
        label: "Email",
        tip: "text",
        required: true,
      },
    ],
  };
  return <Formular schema={schemaAdoptie} />;
}
