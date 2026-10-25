"use client";

import { DownloadButton } from "@/components/ui/DownloadButton";

export function PrintButton() {
  return (
    <DownloadButton className="no-print" onClick={() => window.print()}>
      Print / Save PDF
    </DownloadButton>
  );
}
