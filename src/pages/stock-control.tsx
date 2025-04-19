import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
export function StockControl() {


  return (
    <Container>
      <Navbar
        link="/stock-control"
        page="Controle de Estoque"
        title="Produtos"
      />
      <section className="mt-4">
        <h1>Controle de Estoque</h1>
      </section>
    </Container>
  );
}
