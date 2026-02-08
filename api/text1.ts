import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory storage (resets on deployment)
let textContent = "Initial message from User 1";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Return current text
    return res.status(200).json({ text: textContent });
  }

  if (req.method === 'POST') {
    // Update text
    const { text } = req.body;
    if (text) {
      textContent = text;
      return res.status(200).json({ success: true, text: textContent });
    }
    return res.status(400).json({ error: 'No text provided' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}