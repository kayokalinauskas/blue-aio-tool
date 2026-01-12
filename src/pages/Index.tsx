import { Header } from "@/components/Header";
import { GtinGenerator } from "@/components/tools/GtinGenerator";
import { CpfGenerator } from "@/components/tools/CpfGenerator";
import { CnpjGenerator } from "@/components/tools/CnpjGenerator";
import { JsonFormatter } from "@/components/tools/JsonFormatter";
import { Base64Tool } from "@/components/tools/Base64Tool";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Ferramentas para <span className="text-gradient">Desenvolvedores</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Geradores de documentos brasileiros, formatador JSON e conversor Base64.
            Todas as ferramentas funcionam offline diretamente no seu navegador.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Generators Row */}
          <GtinGenerator />
          <CpfGenerator />
          <CnpjGenerator />
          <Base64Tool />
          
          {/* Full Width Tools */}
          <div className="lg:col-span-2">
            <JsonFormatter />
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Todos os dados são gerados localmente no seu navegador.
            <br />
            <span className="text-primary/70">Nenhuma informação é enviada para servidores externos.</span>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
