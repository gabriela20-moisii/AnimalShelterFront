import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ListaAdaposturi from "./pages/ListaAdaposturi";
import AdapostDetalii from "./pages/AdapostDetalii";
import AnimalDetalii from "./pages/AnimalDetalii";
import AngajatDetalii from "./pages/AngajatDetalii";
import AdaugaAdapost from "./components/AdaugaAdapost";
import AdaugaAnimal from "./components/AdaugaAnimal";
import AdaugaAngajat from "./components/AdaugaAngajat";
import AdaugaAdoptie from "./components/AdaugaAdoptie";
import AdaugaRetur from "./components/AdaugaRetur";
import AdaugaTransfer from "./components/AdaugaTransfer";
import AdaugaInterventie from "./components/AdaugaInterventie";
import AdaugaVizita from "./components/AdaugaVizita";
import AdaugaPlata from "./components/AdaugaPlata";
import AdaugaVenit from "./components/AdaugaVenit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ListaAdaposturi />} />
          <Route path="/adauga-adapost" element={<AdaugaAdapost />} />
        </Route>
        <Route path="/adapost/:id" element={<AdapostDetalii />} />
        <Route path="/adapost/:id/adauga-animal" element={<AdaugaAnimal />} />
        <Route path="/adapost/:id/adauga-angajat" element={<AdaugaAngajat />} />
        <Route path="/adapost/:id/adauga-plata" element={<AdaugaPlata />} />
        <Route path="/adapost/:id/adauga-venit" element={<AdaugaVenit />} />
        <Route
          path="/adapost/:idAdapost/animale/:idAnimal"
          element={<AnimalDetalii />}
        />
        <Route
          path="/adapost/:idAdapost/animale/:idAnimal/adoptie"
          element={<AdaugaAdoptie />}
        />
        <Route
          path="/adapost/:idAdapost/animale/:idAnimal/retur"
          element={<AdaugaRetur />}
        />
        <Route
          path="/adapost/:idAdapost/animale/:idAnimal/transfer"
          element={<AdaugaTransfer />}
        />
        <Route
          path="/adapost/:idAdapost/animale/:idAnimal/interventie-medicala"
          element={<AdaugaInterventie />}
        />
        <Route
          path="/adapost/:idAdapost/angajat/:idAngajat"
          element={<AngajatDetalii />}
        />
        <Route
          path="/adapost/:idAdapost/angajat/:idAngajat/adauga-vizita"
          element={<AdaugaVizita />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
