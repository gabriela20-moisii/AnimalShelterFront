import Formular from "../layouts/Formular";

export default function AdaugaAdapost() {
  const schemaAdapost = {
    titlu: "Adaugă un Adăpost",
    method: "POST",
    endpoint: "${import.meta.env.VITE_API_URL}/api/adaposturi",
    campuri: [
      {
        nume: "nume",
        label: "Numele Adapostului",
        tip: "text",
        placeholder: "ex: Animal Rescue Bucuresti",
        required: true,
      },
      {
        nume: "oras",
        label: "Oras",
        tip: "text",
        placeholder: "ex: Bucuresti",
        required: true,
      },
      {
        nume: "adresa",
        label: "Adresa Completa",
        tip: "text",
        placeholder: "ex: Bulevardul Unirii nr. 10",
        required: true,
      },
    ],
  };

  return <Formular schema={schemaAdapost} />;
}
