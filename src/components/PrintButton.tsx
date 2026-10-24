"use client";

export function PrintButton() {
  return <button type="button" className="btn btn-solid btn-sm no-print" onClick={() => window.print()}>Print / save as PDF</button>;
}
