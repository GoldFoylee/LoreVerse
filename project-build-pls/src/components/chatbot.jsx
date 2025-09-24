import { useState } from "react";

const API_KEY = "YOUR_API_KEY_HERE";

function Chatbot() {
  const [book1, setBook1] = useState("");
  const [book2, setBook2] = useState("");
  const [book3, setBook3] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getRecommendations() {
    const input = [book1, book2, book3].filter(Boolean).join(", ");
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setRecommendations([]);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `You are a recommendation engine.
Given these books: ${input}
Suggest 5 similar books in the format:
Title by Author`,
            },
          ],
        },
      ],
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const lines = text
        .split("\n")
        .filter((line) => line.includes(" by "))
        .slice(0, 5);

      const booksWithImages = await Promise.all(
        lines.map(async (line) => {
          const [rawTitle, rawAuthor] = line.split(" by ");
          const title = rawTitle.replace(/\*\*/g, "").trim();
          const author =
            rawAuthor?.replace(/\*\*/g, "").trim() || "Unknown Author";

          const searchUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(
            title
          )}`;

          try {
            const res = await fetch(searchUrl);
            const json = await res.json();
            const matchWithCover = json.docs.find((doc) => doc.cover_i);
            const coverId = matchWithCover?.cover_i;
            const img = coverId
              ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
              : null;

            return { title, author, img };
          } catch {
            return { title, author, img: null };
          }
        })
      );

      setRecommendations(booksWithImages);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-yellow-200 px-6 py-10 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-fog bg-yellow-300 opacity-10"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-10">
          📚 LoreVerse BookBot
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-6xl mx-auto mb-10">
          {[book1, book2, book3].map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => {
                const setters = [setBook1, setBook2, setBook3];
                setters[index](e.target.value);
              }}
              placeholder={`Book ${index + 1}`}
              className="px-4 py-2 bg-gray-900 border border-yellow-600 text-yellow-100 placeholder-yellow-400 rounded"
            />
          ))}
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={getRecommendations}
            disabled={loading}
            className="bg-yellow-600 hover:bg-yellow-700 transition-colors text-black font-bold py-2 px-6 rounded"
          >
            {loading ? "Loading..." : "Get Recommendations"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="w-full px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((book, idx) => (
              <div
                key={idx}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 border border-yellow-600"
              >
                {book.img ? (
                  <img
                    src={book.img}
                    alt={book.title}
                    className="w-full h-[400px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[400px] bg-gray-800 flex items-center justify-center text-yellow-500">
                    No Image
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-yellow-300 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-yellow-500">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
