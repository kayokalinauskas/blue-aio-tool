import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileJson, Copy, Check, Sparkles, Minimize2 } from "lucide-react";
import { toast } from "sonner";

export function JsonFormatter() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>("");
  const [indentSize, setIndentSize] = useState(2);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError("");
      toast.success("JSON formatado com sucesso!");
    } catch (e) {
      setError("JSON inválido. Verifique a sintaxe.");
      setOutput("");
      toast.error("Erro ao formatar JSON");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
      toast.success("JSON minificado!");
    } catch (e) {
      setError("JSON inválido. Verifique a sintaxe.");
      setOutput("");
      toast.error("Erro ao minificar JSON");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("JSON copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <FileJson className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="tool-title">Formatador JSON</h2>
          <p className="tool-description">Formate e valide seu JSON</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Entrada</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"exemplo": "cole seu JSON aqui"}'
            className="font-mono min-h-[150px] bg-muted/50 border-border resize-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Indentação:
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="bg-muted border border-border rounded px-2 py-1 text-foreground"
            >
              <option value={2}>2 espaços</option>
              <option value={4}>4 espaços</option>
              <option value={1}>1 tab</option>
            </select>
          </label>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleFormat} className="flex-1 gap-2">
            <Sparkles className="w-4 h-4" />
            Formatar
          </Button>
          <Button onClick={handleMinify} variant="secondary" className="gap-2">
            <Minimize2 className="w-4 h-4" />
            Minificar
          </Button>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-muted-foreground">Saída</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="gap-2 h-8"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado" : "Copiar"}
              </Button>
            </div>
            <pre className="code-display overflow-auto max-h-[300px] whitespace-pre text-sm">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
