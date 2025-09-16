import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function App() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const goAdd = () => {
    if (!token) return navigate("/login");
    navigate("/add");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.reload();
  };

  return (
    <div className="container">
      <header>
        <h1>🛒 MERN E-Commerce</h1>
        <div>
          {token ? (
            <>
              <span>Hi, {localStorage.getItem("name")}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>{" "}
              <Link to="/register">Register</Link>
            </>
          )}
          <button onClick={goAdd}>Add Product</button>
        </div>
      </header>

      <main>
        {products.length === 0 ? (
          <p>No products yet — add one!</p>
        ) : (
          <div className="grid">
            {products.map((p) => (
              <div key={p._id} className="card">
                <div className="card-body">
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <p><b>₹{p.price}</b></p>
                  <p>Stock: {p.countInStock}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
