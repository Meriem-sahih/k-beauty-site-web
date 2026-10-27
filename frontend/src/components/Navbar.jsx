
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  }

  return (
    <nav className="navbar">
      <div className="logo">K-BEAUTY</div>

      <div className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/produits">Produits</Link>
        <Link to="/categories">Catégories</Link>
        <Link to="/panier">🛒 Panier</Link>

        {user && (
          <Link to="/mes-commandes">Mes commandes</Link>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin/commandes">Gestion des commandes</Link>
            <Link to="/admin/produits">Gestion des produits</Link>
          </>
        )}
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <span>{user.name}</span>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
