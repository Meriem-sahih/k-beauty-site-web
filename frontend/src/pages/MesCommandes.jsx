
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MesCommandes() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Veuillez vous connecter pour voir vos commandes.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/orders",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Impossible de charger vos commandes."
          );
        }

        setOrders(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Chargement de vos commandes...</p>;
  }

  if (error) {
    return (
      <div>
        <h1>Mes commandes</h1>
        <p>{error}</p>
        <Link to="/login">Se connecter</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Mes commandes</h1>

      {orders.length === 0 ? (
        <div>
          <p>Vous n'avez pas encore de commande.</p>
          <Link to="/produits">Découvrir nos produits</Link>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <hr />

            <h2>Commande n° {order.id}</h2>

            <p>
              Date :{" "}
              {order.created_at
                ? new Date(order.created_at).toLocaleDateString("fr-FR")
                : "Non disponible"}
            </p>

            <p>Statut : {order.status}</p>

            <h3>Produits commandés</h3>

            {order.items?.map((item) => (
              <div key={item.id}>
                <p>
                  {item.product?.name || "Produit"} — Quantité :{" "}
                  {item.quantity}
                </p>
                <p>
                  Prix unitaire : {item.price} DH
                </p>
              </div>
            ))}

            <h3>Total : {order.total} DH</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default MesCommandes;
