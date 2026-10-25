import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function SearchLoading() {
  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center py-20">
      <div className="glass-box flex flex-col items-center gap-4 px-10 py-8">
        <LoadingSpinner label="Searching study hub…" />
      </div>
    </div>
  );
}
