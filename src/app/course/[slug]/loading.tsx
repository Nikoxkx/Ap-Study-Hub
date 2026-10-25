import { GlassCard, LoadingSpinner } from "@/components/ui";

export default function CourseLoading() {
  return (
    <div className="wrap py-12 md:py-16">
      <GlassCard padding="lg" className="mx-auto flex max-w-md flex-col items-center justify-center py-10 text-center">
        <LoadingSpinner label="Loading course material…" />
      </GlassCard>
    </div>
  );
}
