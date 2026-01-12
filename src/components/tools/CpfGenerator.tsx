import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Copy, RefreshCw, Check } from "lucide-react";
import { toast } from "sonner";

function generateCpf(formatted: boolean = true): string {
  // Generate first 9 random digits
  const digits: number[] = [];
  for (let i = 0; i < 9; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  // Calculate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }
  let firstCheck = 11 - (sum % 11);
  if (firstCheck >= 10) firstCheck = 0;
  digits.push(firstCheck);

  // Calculate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * (11 - i);
  }
  let secondCheck = 11 - (sum % 11);
  if (secondCheck >= 10) secondCheck = 0;
  digits.push(secondCheck);

  const cpf = digits.join("");
  
  if (formatted) {
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
  }
  return cpf;
}

export function CpfGenerator() {
  const [cpf, setCpf] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [formatted, setFormatted] = useState(true);

  const handleGenerate = () => {
    setCpf(generateCpf(formatted));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!cpf) return;
    await navigator.clipboard.writeText(cpf);
    setCopied(true);
    toast.success("CPF copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFormat = () => {
    setFormatted(!formatted);
    if (cpf) {
      const raw = cpf.replace(/\D/g, "");
      if (!formatted) {
        setCpf(`${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`);
      } else {
        setCpf(raw);
      }
    }
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="tool-title">Gerador de CPF</h2>
          <p className="tool-description">CPF válido para testes</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="code-display min-h-[60px] flex items-center justify-center">
          {cpf ? (
            <span className="text-2xl tracking-widest text-foreground">{cpf}</span>
          ) : (
            <span className="text-muted-foreground">Clique em gerar para criar um CPF</span>
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
            Gerar CPF
          </Button>
          <Button
            variant="secondary"
            onClick={handleCopy}
            disabled={!cpf}
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
