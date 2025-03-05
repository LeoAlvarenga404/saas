import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";

export function Home() {
  return (
    <Container>
      <Navbar link="/" page="Visão Geral" title="Dashboard" />
      <section className="mt-4">
        <h1>Home</h1>
      </section>
    </Container>
  );
}
