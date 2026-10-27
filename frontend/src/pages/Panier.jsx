
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Panier() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    total,
  } = useCart();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function confirmerCommande() {
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      setError("Votre panier est vide.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cart.map((item) => ({
              product_id: item.id,
              quantity: item.quantity,
            })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          throw new Error(
            Object.values(data.errors).flat().join(" ")
          );
        }

        throw new Error(
          data.message || "Impossible de confirmer la commande."
        );
      }

      clearCart();
      setSuccess(
        `Commande n° ${data.order.id} confirmée avec succès !`
      );
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div>
        <h1>Votre panier</h1>

        {success && <p>{success}</p>}
        {error && <p>{error}</p>}

        {!success && !error && (
          <p>Votre panier est vide.</p>
        )}

        <Link to="/produits">Découvrir nos produits</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Votre panier</h1>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      {cart.map((product) => (
        <div key={product.id}>
          <img
            src={`http://127.0.0.1:8000/images/products/${product.image}`}
            alt={product.name}
            width="100"
          />

          <h2>{product.name}</h2>
          <p>Prix : {product.price} DH</p>

          <div>
            <button
              onClick={() => decreaseQuantity(product.id)}
              disabled={loading}
            >
              -
            </button>

            <span>{product.quantity}</span>

            <button
              onClick={() => increaseQuantity(product.id)}
              disabled={loading}
            >
              +
            </button>
          </div>

          <p>
            Sous-total :{" "}
            {Number(product.price) * product.quantity} DH
          </p>

          <button
            onClick={() => removeFromCart(product.id)}
            disabled={loading}
          >
            Supprimer
          </button>
        </div>
      ))}

      <hr />

      <h2>Total : {total} DH</h2>

      <button
        onClick={confirmerCommande}
        disabled={loading}
      >
        {loading ? "Confirmation..." : "Confirmer la commande"}
      </button>
    </div>
  );
}

export default Panier;
