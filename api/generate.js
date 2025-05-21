// api/generate.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { expenses } = req.body;

  if (!expenses || !Array.isArray(expenses)) {
    return res.status(400).json({ error: 'Expenses must be an array' });
  }

  try {
    const formattedInput = `Actúa como un asesor financiero. Dado este listado de gastos mensuales, sugiere formas concretas de reducir el presupuesto sin afectar calidad de vida:\n${expenses
      .map((e) => `- ${e.name}: $${e.amount}`)
      .join('\n')}`;

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
    return res.status(200).json({ content });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error processing request' });
  }
}
