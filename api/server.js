// server.js
import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import fetch from "node-fetch"; // Asegurate de tener esto instalado
config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(json());

app.post("/api/generate", async (req, res) => {
  const { gastos } = req.body;

  const formattedInput = `Actúa como un asesor financiero. Dado este listado de gastos mensuales, sugiere formas concretas de reducir el presupuesto sin afectar calidad de vida:\n
  ${gastos
    .map((e) => `- ${e.descripcion}: $${e.monto}`)
    .join("\n")}`;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-small",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: formattedInput,
        }),
      }
    );

    const data = await response.json();
    res.json({ result: data[0]?.generated_text || "Sin respuesta" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al contactar Hugging Face" });
  }
});

// 🔴 IMPORTANTE: ruta por defecto para evitar errores 404
app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
