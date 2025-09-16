import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const [form, setForm] = useState({ name: "", price: "", description: "", countInStock: 0 });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        { ...form, price: Number(form.price), countInStock: Number(form.countInStock) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={onSubmit} className="form">
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
        <input placeholder="Count In Stock" type="number" value={form.countInStock} onChange={e => setForm({ ...form, countInStock: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
