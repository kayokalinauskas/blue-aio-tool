import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Barcode, Copy, RefreshCw, Check } from "lucide-react";
import { toast } from "sonner";

function generateGtinEan13(): string {
  // Brazil prefix: 789
  const prefix = "789";
  
  // Generate 9 random digits
  let code = prefix;
  for (let i = 0; i < 9; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  
  // Calculate check digit
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(code[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  
  return code + checkDigit.toString();
}

export function GtinGenerator() {
  const [gtin, setGtin] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setGtin(generateGtinEan13());
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!gtin) return;
    await navigator.clipboard.writeText(gtin);
    setCopied(true);
    toast.success("GTIN copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Barcode className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="tool-title">Gerador de GTIN EAN-13</h2>
          <p className="tool-description">Código de barras com prefixo Brasil (789)</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="code-display min-h-[60px] flex items-center justify-center">
          {gtin ? (
            <span className="text-2xl tracking-widest text-foreground">{gtin}</span>
          ) : (
            <span className="text-muted-foreground">Clique em gerar para criar um GTIN</span>
          )}
        </div>

        <div className="flex gap-3">
          <Button onClick={handleGenerate} className="flex-1 gap-2">
            <RefreshCw className="w-4 h-4" />
            Gerar GTIN
          </Button>
          <Button
            variant="secondary"
            onClick={handleCopy}
            disabled={!gtin}
            className="gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copiado" : "Copiar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
