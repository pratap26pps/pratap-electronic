 
export default async function handler(req, res) {
    const { prompt } = req.body;
  
    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768", // or "llama3-70b-8192"
          messages: [
            { role: "system", content: "You are a helpful AI voice assistant." },
            { role: "user", content: prompt },
          ],
        }),
      });
  
      const data = await groqRes.json();
      const reply = data.choices[0]?.message?.content;
  
      res.status(200).json({ reply });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to get Groq response" });
    }
  }
  