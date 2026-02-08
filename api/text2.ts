import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory storage (resets on deployment)
let textContent: string | null = null;

async function getInitialContent() {
  if (textContent === null) {
    try {
      // Fetch initial content from GitHub
      const response = await fetch(
        'https://raw.githubusercontent.com/priandoyo/react-frontend-workshop/main/public/text2.txt'
      );
      textContent = await response.text();
    } catch (error) {
      console.error('Error loading from GitHub:', error);
      textContent = "Error loading initial content from GitHub";
    }
  }
  return textContent;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Get content (from memory or load from GitHub on first request)
    const content = await getInitialContent();
    return res.status(200).json({ text: content });
  }

  if (req.method === 'POST') {
    // Update text in memory (live update)
    const { text } = req.body;
    if (text !== undefined) {
      textContent = text;
      return res.status(200).json({ success: true, text: textContent });
    }
    return res.status(400).json({ error: 'No text provided' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}