import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img
        src={`http://127.0.0.1:8000/images/products/${product.image}`}
        alt={product.name}
      />

      <h2>{product.name}</h2>

      <p>Prix : {product.price} DH</p>

      <p>Catégorie : {product.category.name}</p>

      <button onClick={() => addToCart(product)}>
        Ajouter au panier
      </button>
    </div>
  );
}

export default ProductCard;