'use client';

import { Button } from '@/components/ui/button';
import { FlowboardVisualization } from './FlowboardVisualization';

export function Hero() {
  return (
    <section className="relative min-h-screen bg-card text-card-foreground overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 animate-grid-pulse"
          style={{
            backgroundImage: `
              linear-gradient(to right, oklch(0.5566 0.14 244.9518) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(0.5566 0.14 244.9518) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left content */}
          <div className="space-y-8 animate-slide-in-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-sans font-bold leading-tight text-balance">
              Organize seu trabalho, sua vida e tudo mais.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl">
              Flowboard é a ferramenta visual que permite que sua equipe
              gerencie qualquer tipo de projeto, fluxo de trabalho ou
              monitoramento de tarefas de forma intuitiva.
            </p>
            <Button size="lg" className="text-lg px-8 py-6 font-sans">
              Comece agora - É grátis
            </Button>
          </div>

          {/* Right visualization */}
          <div className="relative lg:block hidden">
            <FlowboardVisualization />
          </div>
        </div>
      </div>
    </section>
  );
}
