require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Analyze endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { claim, mode } = req.body;
    
    // Create prompt based on mode
    let prompt = '';
    if (mode === 'quick') {
      prompt = `You are a fitness myth debunking AI assistant. Analyze this fitness claim with scientific rigor: "${claim}". 
      Provide a verdict (Confirmed, Partly True, Unproven, Misleading, or Debunked), a concise reason for your verdict, 
      and simplified evidence. Format your response as JSON with the following structure:
      {
        "claim": "the original claim",
        "verdict": "your verdict",
        "reason": "your reasoning",
        "evidence": {
          "type": "plain",
          "content": "simplified evidence"
        }
      }`;
    } else {
      prompt = `You are a fitness myth debunking AI assistant trained on comprehensive scientific research. 
      Thoroughly analyze this fitness claim with scientific rigor: "${claim}". 
      Provide a verdict (Confirmed, Partly True, Unproven, Misleading, or Debunked), a detailed reason for your verdict, 
      and comprehensive evidence with scientific references. Format your response as JSON with the following structure:
      {
        "claim": "the original claim",
        "verdict": "your verdict",
        "reason": "your detailed reasoning",
        "evidence": {
          "type": "detailed",
          "content": "comprehensive evidence",
          "references": ["reference 1", "reference 2", "reference 3"]
        }
      }`;
    }

    // Call OpenAI API
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a fitness myth debunking AI assistant, trained on comprehensive scientific research and expert knowledge.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    // Parse the response
    const content = response.data.choices[0].message.content;
    const parsedResponse = JSON.parse(content);
    
    res.json(parsedResponse);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while analyzing the claim' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});