
import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api";

function AdminProduits() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category_id: "",
  });

  const token = localStorage.getItem("token");

  async function loadData() {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch(`${API_URL}/products`),
        fetch(`${API_URL}/categories`),
      ]);

      if (!productsResponse.ok || !categoriesResponse.ok) {
        throw new Error("Impossible de charger les données.");
      }

      const productsData = await productsResponse.json();
      const categoriesData = await categoriesResponse.json();

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function resetForm() {
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      image: "",
      category_id: "",
    });
    setEditingId(null);
  }

  function handleEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name ?? "",
      description: product.description ?? "",
      price: product.price ?? "",
      stock: product.stock ?? "",
      image: product.image ?? "",
      category_id: product.category_id ?? "",
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("Connectez-vous avec le compte administrateur.");
      return;
    }

    const isEditing = editingId !== null;
    const url = isEditing
      ? `${API_URL}/admin/products/${editingId}`
      : `${API_URL}/admin/products`;

    try {
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          category_id: Number(form.category_id),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errors = data.errors
          ? Object.values(data.errors).flat().join(" ")
          : data.message;

        throw new Error(errors || "Une erreur est survenue.");
      }

      setMessage(data.message || "Opération réussie.");
      resetForm();
      await loadData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer le produit "${product.name}" ?`
    );

    if (!confirmed) return;

    if (!token) {
      setMessage("Connectez-vous avec le compte administrateur.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/admin/products/${product.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Impossible de supprimer ce produit.");
      }

      setMessage(data.message || "Produit supprimé.");
      if (editingId === product.id) resetForm();
      await loadData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div>
      <h1>Gestion des produits</h1>

      {message && <p role="status">{message}</p>}

      <h2>{editingId ? "Modifier le produit" : "Ajouter un produit"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom du produit</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Prix (DH)</label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Stock</label>
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Image (nom ou chemin de l'image)</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Catégorie</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Choisir une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">
          {editingId ? "Enregistrer les modifications" : "Ajouter le produit"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Annuler
          </button>
        )}
      </form>

      <hr />

      <h2>Produits existants ({products.length})</h2>

      {products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price} DH</td>
                <td>{product.stock}</td>
                <td>{product.category?.name ?? "—"}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(product)}
                  >
                    Modifier
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(product)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminProduits;
