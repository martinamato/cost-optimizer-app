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
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: [
            {
              role: "user",
              content: formattedInput,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    // Extraer la respuesta del modelo desde el campo correcto
    const content = data.choices?.[0]?.message?.content;

// Enviar la respuesta al cliente
    res.json({ result: content || "Sin respuesta del modelo." });
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
