import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Accueil() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>

      {/* Hero */}
      <section className="hero">
        <h1>Découvrez la beauté coréenne</h1>

        <p>
          Une sélection de produits pour prendre soin
          de votre peau, de vos cheveux et de votre corps.
        </p>

        <Link to="/produits">
          Découvrir nos produits
        </Link>
      </section>


      {/* Catégories */}
      <section className="categories-section">
        <h2>Nos catégories</h2>

        <div className="categories-list">
          {categories.map((category) => (
            <div className="category-card" key={category.id}>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Produits populaires */}
      <section className="products-section">
        <h2>Produits populaires</h2>

        <div className="products-list">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <Link to="/produits">
          Voir tous les produits
        </Link>
      </section>

    </div>
  );
}

export default Accueil;