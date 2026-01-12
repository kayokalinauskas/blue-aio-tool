import { Wrench } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 glow-effect">
            <Wrench className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">DevTools BR</h1>
            <p className="text-xs text-muted-foreground">Ferramentas para desenvolvedores</p>
          </div>
        </div>
      </div>
    </header>
  );
}
