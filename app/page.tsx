"use client";

import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [incarcare, setIncarcare] = useState(false);

  async function handleTrimitere(e: React.FormEvent) {
    e.preventDefault();
    setIncarcare(true);

    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: link }),
    });

    const data = await response.json();
    setShortLink(`${window.location.origin}/${data.slug}`);
    setIncarcare(false);
  }

return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
        <form onSubmit={handleTrimitere}>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://site.com"
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={incarcare}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {incarcare ? "Se procesează..." : "Scurtează URL"}
          </button>
        </form>

        {shortLink && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">URL scurt:</p>
            
             <a href={shortLink}
              target="_blank"
              className="text-blue-600 font-medium break-all hover:underline"
            >
              {shortLink}
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
