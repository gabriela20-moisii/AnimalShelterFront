import Formular from "../layouts/Formular";
import { useParams } from "react-router-dom";

export default function AdaugaRetur() {
  const { idAnimal, idAdapost } = useParams();
  const schemaRetur = {
    titlu: "Inroleaza Adoptie",
    method: "PUT",
    endpoint: `${import.meta.env.VITE_API_URL}/api/adaposturi/${idAdapost}/animale/${idAnimal}/returnare`,
    campuri: [
      {
        nume: "motiv",
        label: "Adauga Motiv",
        tip: "text",
        required: true,
      },
    ],
  };
  return <Formular schema={schemaRetur} />;
}
