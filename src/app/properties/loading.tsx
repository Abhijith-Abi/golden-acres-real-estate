import { Skeleton } from "@/components/ui/skeleton";

/** Route-level loading skeleton for the properties discovery page. */
export default function Loading() {
  return (
    <div className="pt-36 lg:pt-44">
      <div className="container-site">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="mt-5 h-12 w-full max-w-xl" />
        <Skeleton className="mt-4 h-5 w-full max-w-md" />
      </div>
      <div className="container-site mt-14">
        <div className="border border-charcoal/10 bg-card p-5">
          <Skeleton className="h-11 w-full" />
          <div className="mt-4 flex gap-3">
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-9 w-40" />
          </div>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[4/3] w-full" />
              <Skeleton className="mt-4 h-4 w-32" />
              <Skeleton className="mt-3 h-6 w-3/4" />
              <Skeleton className="mt-3 h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
