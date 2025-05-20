import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Usar el nuevo cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/generate', async (req, res) => {
  const { gastos, proveedores } = req.body;

  const prompt = `Eres un asistente financiero para emprendedores.
Analiza estos datos y sugiere cómo reducir costos y mejorar rentabilidad.

Gastos:
${JSON.stringify(gastos, null, 2)}

Proveedores:
${JSON.stringify(proveedores, null, 2)}

Dame recomendaciones claras y breves.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;
    res.json({ suggestions: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar sugerencias' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
