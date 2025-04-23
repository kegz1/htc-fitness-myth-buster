import React, { useState } from 'react';
import { Search, Check, X, AlertCircle, Coffee, Loader } from 'lucide-react';

export default function FitnessMythBuster() {
  const [claim, setClaim] = useState('');
  const [mode, setMode] = useState('quick');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!claim.trim()) return;
    setIsLoading(true);
    
    try {
      // Replace with your deployed backend URL in production
      const response = await fetch('https://htc-fitness-myth-buster-backend.onrender.com/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim, mode })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching API", error);
    }
    
    setIsLoading(false);
  };

  const getVerdictIcon = (verdict) => {
    switch (verdict) {
      case 'Confirmed':
        return <Check className="text-green-600" />;
      case 'Partly True':
        return <AlertCircle className="text-yellow-600" />;
      case 'Unproven':
        return <Coffee className="text-gray-600" />;
      case 'Misleading':
        return <AlertCircle className="text-orange-600" />;
      case 'Debunked':
        return <X className="text-red-600" />;
      default:
        return null;
    }
  };

  const getVerdictColor = (verdict) => {
    switch (verdict) {
      case 'Confirmed':
        return 'border-green-600';
      case 'Partly True':
        return 'border-yellow-600';
      case 'Unproven':
        return 'border-gray-600';
      case 'Misleading':
        return 'border-orange-600';
      case 'Debunked':
        return 'border-red-600';
      default:
        return 'border-gray-600';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-black text-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">HTC FITNESS MYTH BUSTER</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="claim" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter a fitness claim to analyze:
                </label>
                <div className="relative">
                  <textarea
                    id="claim"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    placeholder="Example: 'You need to consume protein within 30 minutes after a workout'"
                    value={claim}
                    onChange={(e) => setClaim(e.target.value)}
                  ></textarea>
                  <div className="absolute right-3 bottom-3 text-gray-400">
                    <Search size={18} />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-2">
                  Response Mode:
                </label>
                <select
                  id="mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="block appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="quick">Quick Response</option>
                  <option value="deep">Deep Senzu Research</option>
                </select>
              </div>
              <button
                type="submit"
                className={`w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? 'Analyzing...' : 'Analyze Claim'}
              </button>
            </form>
            
            {isLoading && (
              <div className="flex flex-col items-center justify-center mt-6">
                <Loader className="animate-spin h-10 w-10 text-black mb-2" />
                <p className="text-gray-700 font-medium">Deep Senzu Thinking</p>
              </div>
            )}
          </div>

          {!isLoading && result && (
            <div className={`border-l-4 p-4 bg-white rounded-lg shadow-md ${getVerdictColor(result.verdict)}`}>
              <div className="flex items-center mb-2">
                {getVerdictIcon(result.verdict)}
                <h2 className="ml-2 text-xl font-semibold">{result.verdict}</h2>
              </div>
              <p className="mb-2"><strong>Claim:</strong> {result.claim}</p>
              <p className="mb-2"><strong>Reason:</strong> {result.reason}</p>
              <div>
                <strong>Evidence:</strong>
                <p className="mt-1">{result.evidence.content}</p>
                {result.evidence.references && (
                  <ul className="list-disc ml-6 mt-2">
                    {result.evidence.references.map((ref, idx) => (
                      <li key={idx} className="text-sm text-gray-700">{ref}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-black text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Fitness Myth Buster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}