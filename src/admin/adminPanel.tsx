import React, { useState } from "react";
import { FormData, Coordinates } from "./types";
import "./admin.css";
import { json } from "react-router-dom";

const AdminPanel: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    coordinates: { lat: "", lng: "" },
    rating: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleCoordinateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      coordinates: {
        ...prevData.coordinates,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const storageKey = `${formData.category.toLowerCase()}Data`;
    fetch("/where-to-oslo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));

    // Clear form
    setFormData({
      name: "",
      category: "",
      coordinates: { lat: "", lng: "" },
      rating: 0,
    });
    alert(`Data saved successfully to the ${formData.category} category!`);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Navn:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Kategori:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Velg Kategori</option>
            <option value="Shopping">Shopping</option>
            <option value="Cafe">Cafe</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Drink">Drink</option>
            <option value="Hike">Hike</option>
            <option value="Activity">Activity</option>
          </select>
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="text"
            name="lat"
            value={formData.coordinates.lat}
            onChange={handleCoordinateChange}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="text"
            name="lng"
            value={formData.coordinates.lng}
            onChange={handleCoordinateChange}
            required
          />
        </div>
        <div>
          <label>Artikkel</label>
          <textarea></textarea>
        </div>
        <div>
          <label>Rating:</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Velg Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AdminPanel;
