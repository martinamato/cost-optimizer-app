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
      'https://api-inference.huggingface.co/models/google/flan-t5-small',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: formattedInput,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Hugging Face error: ${error}`);
    }

    const data = await response.json();
    const result = Array.isArray(data) ? data[0]?.generated_text : data;

    return res.status(200).json({ result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error processing request' });
  }
}
