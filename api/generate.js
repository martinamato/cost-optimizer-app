// api/generate.js
export default async function handler(req, res) {
  const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: req.body.prompt }),
  });

  const result = await response.json();
  res.status(200).json(result);
}
