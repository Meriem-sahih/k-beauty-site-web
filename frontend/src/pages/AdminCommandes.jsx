
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminCommandes() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const statuses = [
    "pending",
    "shipped",
    "delivered",
    "cancelled",
  ];

  useEffect(() => {
    async function fetchOrders() {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (!token || !user) {
        setError("Veuillez vous connecter.");
        setLoading(false);
        return;
      }

      if (user.role !== "admin") {
        setError("Accès refusé. Réservé à l'administrateur.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/admin/orders",
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
            data.message || "Impossible de charger les commandes."
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

  async function changerStatut(orderId, newStatus) {
    const token = localStorage.getItem("token");

    setError("");
    setMessage("");
    setUpdatingId(orderId);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Impossible de modifier le statut."
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );

      setMessage(`Statut de la commande n° ${orderId} modifié.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <p>Chargement des commandes...</p>;
  }

  if (error && orders.length === 0) {
    return (
      <div>
        <h1>Gestion des commandes</h1>
        <p>{error}</p>
        <Link to="/login">Se connecter</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Gestion des commandes</h1>

      {error && <p>{error}</p>}
      {message && <p>{message}</p>}

      {orders.length === 0 ? (
        <p>Aucune commande pour le moment.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <hr />

            <h2>Commande n° {order.id}</h2>

            <p>
              Client : {order.user?.name || "Non disponible"}
            </p>

            <p>
              Email : {order.user?.email || "Non disponible"}
            </p>

            <p>
              Date :{" "}
              {order.created_at
                ? new Date(order.created_at).toLocaleDateString("fr-FR")
                : "Non disponible"}
            </p>

            <p>Statut actuel : {order.status}</p>

            <label htmlFor={`status-${order.id}`}>
              Modifier le statut :
            </label>{" "}

            <select
              id={`status-${order.id}`}
              value={order.status}
              disabled={updatingId === order.id}
              onChange={(e) =>
                changerStatut(order.id, e.target.value)
              }
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {updatingId === order.id && (
              <p>Modification en cours...</p>
            )}

            <h3>Produits commandés</h3>

            {order.items?.map((item) => (
              <div key={item.id}>
                <p>
                  {item.product?.name || "Produit"} — Quantité :{" "}
                  {item.quantity}
                </p>
                <p>Prix unitaire : {item.price} DH</p>
              </div>
            ))}

            <h3>Total : {order.total} DH</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminCommandes;
