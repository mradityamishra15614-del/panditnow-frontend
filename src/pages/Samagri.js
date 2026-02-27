import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function Samagri() {
  const [pujas, setPujas] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPujas = async () => {
      try {
        const res = await axios.get("/api/pujas");
        setPujas(res.data);
      } catch (error) {
        console.error("Error fetching pujas:", error);
      }
    };

    fetchPujas();
  }, []);

  const handleSelect = (e) => {
    const slug = e.target.value;
    setSelectedSlug(slug);

    if (slug) {
      navigate(`/samagri/${slug}`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Select Puja to View Samagri</h1>

      <select
        value={selectedSlug}
        onChange={handleSelect}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginTop: "20px",
        }}
      >
        <option value="">-- Select Puja --</option>
        {pujas.map((puja) => (
          <option key={puja._id} value={puja.slug}>
            {puja.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Samagri;