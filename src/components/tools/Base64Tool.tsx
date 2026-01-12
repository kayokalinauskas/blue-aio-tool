import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Binary, Copy, Check, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";

export function Base64Tool() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string>("");

  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError("");
      toast.success("Texto codificado em Base64!");
    } catch (e) {
      setError("Erro ao codificar. Verifique o texto de entrada.");
      toast.error("Erro na codificação");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      setError("");
      toast.success("Base64 decodificado!");
    } catch (e) {
      setError("Base64 inválido. Verifique a entrada.");
      toast.error("Erro na decodificação");
    }
  };

  const handleProcess = () => {
    if (mode === "encode") {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Resultado copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Binary className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="tool-title">Base64 Encoder/Decoder</h2>
          <p className="tool-description">Converta texto para Base64 e vice-versa</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMode}
          className="gap-2"
        >
          <ArrowRightLeft className="w-4 h-4" />
          {mode === "encode" ? "Encode" : "Decode"}
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">
            {mode === "encode" ? "Texto para codificar" : "Base64 para decodificar"}
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" 
              ? "Digite o texto que deseja codificar..." 
              : "Cole o Base64 que deseja decodificar..."}
            className="font-mono min-h-[120px] bg-muted/50 border-border resize-none"
          />
        </div>

        <Button onClick={handleProcess} className="w-full gap-2">
          <Binary className="w-4 h-4" />
          {mode === "encode" ? "Codificar para Base64" : "Decodificar Base64"}
        </Button>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-muted-foreground">Resultado</label>
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
            <div className="code-display overflow-auto max-h-[200px] break-all">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
