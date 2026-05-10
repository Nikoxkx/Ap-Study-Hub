"use client";
import { useState, useCallback } from "react";

interface Card { id: number; front: string; back: string; }

const accent: Record<string, string> = { blue: "bg-blue-600", emerald: "bg-emerald-600", purple: "bg-purple-600" };

export function FlashcardDeck({ cards, color }: { cards: Card[]; color: string }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [order, setOrder] = useState(cards.map((_, i) => i));
  const bar = accent[color] || accent.blue;
  const card = cards[order[idx]];

  const next = useCallback(() => { setFlipped(false); setTimeout(() => setIdx(i => (i + 1) % cards.length), 120); }, [cards.length]);
  const prev = useCallback(() => { setFlipped(false); setTimeout(() => setIdx(i => (i - 1 + cards.length) % cards.length), 120); }, [cards.length]);
  const shuffle = useCallback(() => { setOrder(o => [...o].sort(() => Math.random() - 0.5)); setIdx(0); setFlipped(false); }, []);

  if (!cards.length) return <p className="text-sm text-muted-foreground">No flashcards available.</p>;

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between mb-3 text-xs text-muted-foreground">
        <span>{idx + 1} of {cards.length}</span>
        <button onClick={shuffle} className="hover:text-foreground">⤮ Shuffle</button>
      </div>

      <div className="w-full bg-muted rounded-full h-1 mb-5">
        <div className={`${bar} h-1 rounded-full transition-all`} style={{ width: `${((idx + 1) / cards.length) * 100}%` }} />
      </div>

      <div className="flashcard-flip cursor-pointer mb-5" onClick={() => setFlipped(!flipped)} style={{ minHeight: 200 }}>
        <div className={`flashcard-inner ${flipped ? "flipped" : ""} relative w-full h-full`}>
          <div className="flashcard-front absolute inset-0 card p-6 flex flex-col items-center justify-center text-center" style={{ minHeight: 200 }}>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Question</span>
            <p className="text-base font-medium">{card.front}</p>
            <span className="text-[10px] text-muted-foreground mt-4">Click to flip</span>
          </div>
          <div className="flashcard-back absolute inset-0 card p-6 flex flex-col items-center justify-center text-center" style={{ minHeight: 200 }}>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Answer</span>
            <p className="text-sm text-muted-foreground">{card.back}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={prev} className="btn btn-outline text-xs">← Prev</button>
        <button onClick={next} className="btn btn-outline text-xs">Next →</button>
      </div>
    </div>
  );
}
