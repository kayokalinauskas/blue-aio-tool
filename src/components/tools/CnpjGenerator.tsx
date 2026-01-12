import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Copy, RefreshCw, Check } from "lucide-react";
import { toast } from "sonner";

function generateCnpj(formatted: boolean = true): string {
  // Generate first 8 random digits (company identifier)
  const digits: number[] = [];
  for (let i = 0; i < 8; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }
  
  // Add branch number (0001 for main branch)
  digits.push(0, 0, 0, 1);

  // Calculate first check digit
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * weights1[i];
  }
  let firstCheck = 11 - (sum % 11);
  if (firstCheck >= 10) firstCheck = 0;
  digits.push(firstCheck);

  // Calculate second check digit
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += digits[i] * weights2[i];
  }
  let secondCheck = 11 - (sum % 11);
  if (secondCheck >= 10) secondCheck = 0;
  digits.push(secondCheck);

  const cnpj = digits.join("");
  
  if (formatted) {
    return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`;
  }
  return cnpj;
}

export function CnpjGenerator() {
  const [cnpj, setCnpj] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [formatted, setFormatted] = useState(true);

  const handleGenerate = () => {
    setCnpj(generateCnpj(formatted));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!cnpj) return;
    await navigator.clipboard.writeText(cnpj);
    setCopied(true);
    toast.success("CNPJ copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFormat = () => {
    setFormatted(!formatted);
    if (cnpj) {
      const raw = cnpj.replace(/\D/g, "");
      if (!formatted) {
        setCnpj(`${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}/${raw.slice(8, 12)}-${raw.slice(12)}`);
      } else {
        setCnpj(raw);
      }
    }
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Building2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="tool-title">Gerador de CNPJ</h2>
          <p className="tool-description">CNPJ válido para testes</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="code-display min-h-[60px] flex items-center justify-center">
          {cnpj ? (
            <span className="text-2xl tracking-widest text-foreground">{cnpj}</span>
          ) : (
            <span className="text-muted-foreground">Clique em gerar para criar um CNPJ</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={formatted}
              onChange={toggleFormat}
              className="rounded border-border bg-input"
            />
            Formatado
          </label>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleGenerate} className="flex-1 gap-2">
            <RefreshCw className="w-4 h-4" />
            Gerar CNPJ
          </Button>
          <Button
            variant="secondary"
            onClick={handleCopy}
            disabled={!cnpj}
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
