
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Accueil from "./pages/Accueil";
import Produits from "./pages/Produits";
import Categories from "./pages/Categories";
import Panier from "./pages/Panier";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MesCommandes from "./pages/MesCommandes";
import AdminCommandes from "./pages/AdminCommandes";
import AdminProduits from "./pages/AdminProduits";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<Accueil />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Pages réservées aux utilisateurs connectés */}
        <Route
          path="/mes-commandes"
          element={
            <ProtectedRoute>
              <MesCommandes />
            </ProtectedRoute>
          }
        />

        {/* Page réservée à l'administrateur */}
        <Route
          path="/admin/commandes"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminCommandes />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/produits"
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminProduits />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
