import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosInstance";

const SamagriPage = () => {
  const { slug } = useParams();
  const [samagri, setSamagri] = useState(null);
  const [language, setLanguage] = useState("hindi");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSamagri = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `/api/samagri/${slug}?language=${language}&city=default`
        );

        setSamagri(res.data);

        // ✅ Dynamic SEO Title
        document.title = `${res.data.puja} Samagri List (2026) | Complete Checklist | PanditNow`;

        // ✅ Dynamic Meta Description
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );

        if (metaDescription) {
          metaDescription.setAttribute(
            "content",
            `Get complete ${res.data.puja} samagri list in Hindi & English. Download checklist and book verified pandit online at PanditNow.`
          );
        }

      } catch (error) {
        console.error("Error fetching samagri:", error);
        setSamagri(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSamagri();
    }
  }, [slug, language]);

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      {samagri ? (
        <>
          <h2>{samagri.puja} Samagri List</h2>

          <div style={{ margin: "20px 0" }}>
            <button onClick={() => setLanguage("hindi")}>Hindi</button>
            <button onClick={() => setLanguage("english")}>English</button>
          </div>

          <ul>
            {samagri.items.map((item) => (
              <li key={item._id} style={{ marginBottom: "10px" }}>
                <strong>{item.name}</strong>
                {item.quantity ? ` (${item.quantity})` : ""}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h3>Samagri not available</h3>
      )}
    </div>
  );
};

export default SamagriPage;