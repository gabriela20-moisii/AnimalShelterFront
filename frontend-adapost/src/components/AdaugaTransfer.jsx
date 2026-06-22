import Formular from "../layouts/Formular";
import { useParams } from "react-router-dom";

export default function AdaugaTransfer() {
  const { idAdapost, idAnimal } = useParams();
  const schemaTransfer = {
    titlu: "Aduga Transfer",
    endpoint: `http://localhost:3000/api/adaposturi/${idAdapost}/animale/${idAnimal}/transfer`,
    method: "POST",
    campuri: [
      {
        nume: "orasDestinatie",
        label: "Oras Destinatie",
        tip: "text",
        placeholder: "ex. Paris",
        required: true,
      },
      {
        nume: "dataTransfer",
        label: "Data Transfer",
        tip: "text",
        placeholder: "2026-03-18",
        required: true,
      },
    ],
  };
  return <Formular schema={schemaTransfer} />;
}
