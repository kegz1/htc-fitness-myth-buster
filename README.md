# Fitness Myth Buster

A full-stack web application that debunks fitness myths by analyzing claims with scientific rigor. Users can choose between a quick summary and a detailed, citation-backed response.

## Features

- Black and white themed UI
- Two response modes: "Quick Response" and "Deep Senzu Thinking"
- Scientific analysis of fitness claims
- Categorized verdicts: "Confirmed," "Partly True," "Unproven," "Misleading," or "Debunked"

## Tech Stack

- **Frontend**: React with Tailwind CSS
- **Backend**: Node.js with Express
- **API**: OpenAI GPT-4

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/fitness-myth-buster.git
   cd fitness-myth-buster
   ```

2. Install dependencies:
   ```
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Create a `.env` file in the server directory with your OpenAI API key:
   ```
   PORT=5000
   OPENAI_API_KEY=your_openai_api_key
   ```

### Running the Application

1. Start the backend server:
   ```
   cd server
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Deployment

- **Frontend**: Deploy the React app to GitHub Pages or Render
- **Backend**: Deploy the Express server to Render

## License

This project is licensed under the MIT License - see the LICENSE file for details.