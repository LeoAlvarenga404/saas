import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";

export function Home() {
  return (
    <Container>
      <Navbar link="/" page="Visão Geral" title="Dashboard" />
      <section className="flex flex-col gap-5 mt-5">
        <div className="flex gap-5">
          <Skeleton className="h-42 w-3/4" />
          <Skeleton className="h-42 w-1/2" />
          <Skeleton className="h-42 w-1/2" />
        </div>
        <div className="flex gap-5">
          <Skeleton className="h-96 w-1/2" />
          <Skeleton className="h-96 w-1/2" />
        </div>
        <div className="flex gap-5">
          <Skeleton className="h-[26rem] w-full" />
          <Skeleton className="h-[26rem] w-full" />
          <Skeleton className="h-[26rem] w-full" />
        </div>
        <div className="flex gap-5">
          <Skeleton className="h-[18rem] w-2/3" />
          <Skeleton className="h-[18rem] w-full" />
        </div>
      </section>
    </Container>
  );
}
