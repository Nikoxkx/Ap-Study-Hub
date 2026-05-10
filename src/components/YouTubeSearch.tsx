"use client";
import { useState } from "react";

interface YouTubeSearchProps {
  courseName: string;
  color: string;
}

const colorMap: Record<string, { button: string; focus: string }> = {
  blue: { button: "bg-blue-600 hover:bg-blue-700", focus: "focus:ring-blue-500" },
  emerald: { button: "bg-emerald-600 hover:bg-emerald-700", focus: "focus:ring-emerald-500" },
  purple: { button: "bg-purple-600 hover:bg-purple-700", focus: "focus:ring-purple-500" },
  red: { button: "bg-red-600 hover:bg-red-700", focus: "focus:ring-red-500" },
  green: { button: "bg-green-600 hover:bg-green-700", focus: "focus:ring-green-500" },
  orange: { button: "bg-orange-600 hover:bg-orange-700", focus: "focus:ring-orange-500" },
  indigo: { button: "bg-indigo-600 hover:bg-indigo-700", focus: "focus:ring-indigo-500" },
};

export function YouTubeSearch({ courseName, color }: YouTubeSearchProps) {
  const [query, setQuery] = useState("");
  const colors = colorMap[color] || colorMap.blue;

  const handleSearch = () => {
    if (!query.trim()) return;
    const searchQuery = encodeURIComponent(`${courseName} ${query}`);
    window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, "_blank");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const suggestedSearches = [
    "unit review",
    "exam tips",
    "practice problems",
    "study guide",
    "crash course",
  ];

  return (
    <div className="card p-6 mt-6">
      <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
        <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        Search YouTube for {courseName} Videos
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Find more video lessons, practice problems, and study guides on YouTube.
      </p>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Search "${courseName} unit 1 review"...`}
          className={`flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 ${colors.focus}`}
        />
        <button
          onClick={handleSearch}
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${colors.button} transition-colors`}
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {suggestedSearches.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              const searchQuery = encodeURIComponent(`${courseName} ${suggestion}`);
              window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, "_blank");
            }}
            className="px-3 py-1 text-xs rounded-full border border-border hover:bg-muted transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
