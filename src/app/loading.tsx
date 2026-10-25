import { GlassCard, LoadingSpinner } from "@/components/ui";

export default function Loading() {
  return (
    <div className="wrap py-20 md:py-28">
      <GlassCard padding="lg" className="mx-auto flex max-w-md flex-col items-center justify-center py-12 text-center">
        <LoadingSpinner label="Loading page content…" />
      </GlassCard>
    </div>
  );
}
