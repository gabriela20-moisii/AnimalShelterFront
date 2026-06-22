import Formular from "../layouts/Formular";
import { useParams } from "react-router-dom";

export default function AdaugaAnimal() {
  const { id } = useParams();
  const schemaAnimal = {
    titlu: "Adauga Animal",
    method: "POST",
    endpoint: `http://localhost:3000/api/adaposturi/${id}/animale`,
    campuri: [
      {
        nume: "nume",
        label: "Nume Animal",
        tip: "text",
        placeholder: "ex: Animal Rescue București",
        required: true,
      },
      {
        nume: "rasa",
        label: "Rasa",
        tip: "text",
        placeholder: "ex: Animal Rescue București",
        required: true,
      },
      {
        nume: "dataNastere",
        label: "Data Nastere",
        tip: "text",
        placeholder: "2025-01-09",
        required: true,
      },
    ],
  };
  return <Formular schema={schemaAnimal} />;
}
