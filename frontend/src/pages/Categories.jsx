
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);

  function afficherProduits(categoryId) {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setProducts([]);
      return;
    }

    fetch("http://127.0.0.1:8000/api/products")
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.filter(
          (product) => Number(product.category_id) === Number(categoryId)
        );

        setProducts(filteredProducts);
        setSelectedCategory(categoryId);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>Nos catégories</h1>

      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <p>{category.description}</p>

          <button onClick={() => afficherProduits(category.id)}>
            {selectedCategory === category.id
              ? "Masquer les produits"
              : "Voir les produits"}
          </button>

          {selectedCategory === category.id && (
            <div>
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>Aucun produit dans cette catégorie.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Categories;
