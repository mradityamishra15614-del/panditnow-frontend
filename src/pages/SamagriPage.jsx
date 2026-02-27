import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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

        document.title = `${res.data.puja} Samagri List (2026) | Complete Checklist | PanditNow`;

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

  const downloadPDF = async () => {
    const input = document.getElementById("pdf-content");
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${samagri.puja}-samagri.pdf`);
  };

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      {samagri ? (
        <>
          {/* Printable Area */}
          <div
  id="pdf-content"
  style={{
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px"
  }}
>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img src="/logo.png" alt="logo" style={{ height: "60px" }} />
              <h2>{samagri.puja} Samagri List</h2>
              <p>Complete Puja Material Checklist</p>
            </div>

            <ul style={{ lineHeight: "1.8", fontSize: "16px" }}>
              {samagri.items.map((item) => (
                <li key={item._id} style={{ marginBottom: "10px" }}>
                  <strong>{item.name}</strong>
                  {item.quantity ? ` (${item.quantity})` : ""}
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div style={{ marginTop: "30px" }}>
            <a
              href={`/booking?puja=${encodeURIComponent(samagri.puja)}`}
              style={{
                backgroundColor: "#ff9800",
                color: "white",
                padding: "10px 20px",
                textDecoration: "none",
                borderRadius: "5px",
                fontWeight: "bold",
                marginRight: "15px",
              }}
            >
              Book {samagri.puja} Now
            </a>

            <button
              onClick={downloadPDF}
              style={{
                backgroundColor: "#1e88e5",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Download PDF
            </button>
          </div>
        </>
      ) : (
        <h3>Samagri not available</h3>
      )}
    </div>
  );
};

export default SamagriPage;