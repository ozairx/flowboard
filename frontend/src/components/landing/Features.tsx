import { Layers, MousePointer2, Users } from 'lucide-react';
import Image from 'next/image';

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-sans font-bold text-center mb-20 text-balance">
          Funcionalidades pensadas para o seu sucesso
        </h2>

        <div className="space-y-32">
          {/* Feature 1: Quadros Visuais */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-sans font-bold text-balance">
                Quadros intuitivos e visuais
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Visualize todo o seu fluxo de trabalho com quadros, listas e
                cartões. Tenha uma visão clara do que precisa ser feito, o que
                está em andamento e o que já foi concluído.
              </p>
            </div>
            <div className="relative h-[400px] bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="grid grid-cols-3 gap-4 w-full">
                  {[1, 2, 3].map((col) => (
                    <div key={col} className="space-y-3">
                      <div className="bg-background rounded-lg p-3 shadow-sm">
                        <div className="h-2 bg-muted rounded w-20" />
                      </div>
                      {[1, 2].map((card) => (
                        <div
                          key={card}
                          className="bg-background rounded-lg p-4 shadow-sm"
                        >
                          <div className="space-y-2">
                            <div className="h-2 bg-muted rounded w-full" />
                            <div className="h-2 bg-muted rounded w-3/4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Arrastar e Soltar */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] bg-muted rounded-lg overflow-hidden lg:order-1 order-2">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full max-w-md">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="bg-background rounded-lg p-3 shadow-sm">
                        <div className="h-2 bg-muted rounded w-16" />
                      </div>
                      <div className="bg-background rounded-lg p-4 shadow-sm">
                        <div className="space-y-2">
                          <div className="h-2 bg-muted rounded w-full" />
                          <div className="h-2 bg-muted rounded w-3/4" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-background rounded-lg p-3 shadow-sm">
                        <div className="h-2 bg-muted rounded w-20" />
                      </div>
                      <div className="bg-background rounded-lg p-4 shadow-sm">
                        <div className="space-y-2">
                          <div className="h-2 bg-muted rounded w-full" />
                          <div className="h-2 bg-muted rounded w-3/4" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <MousePointer2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary animate-pulse" />
                </div>
              </div>
            </div>
            <div className="space-y-6 lg:order-2 order-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <MousePointer2 className="w-6 h-6" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-sans font-bold text-balance">
                Organização com um simples arrastar
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Mova tarefas e reorganize prioridades com uma interface fluida
                de arrastar e soltar. A produtividade nunca foi tão natural.
              </p>
            </div>
          </div>

          {/* Feature 3: Colaboração em Tempo Real */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-sans font-bold text-balance">
                Colaboração em tempo real
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Trabalhe com sua equipe simultaneamente. As atualizações são
                sincronizadas instantaneamente para todos, mantendo todos na
                mesma página.
              </p>
            </div>
            <div className="relative h-[400px] bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full max-w-md">
                  <div className="bg-background rounded-lg p-6 shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary" />
                        <div className="space-y-1 flex-1">
                          <div className="h-2 bg-muted rounded w-24" />
                          <div className="h-2 bg-muted rounded w-16" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent" />
                        <div className="space-y-1 flex-1">
                          <div className="h-2 bg-muted rounded w-28" />
                          <div className="h-2 bg-muted rounded w-20" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary" />
                        <div className="space-y-1 flex-1">
                          <div className="h-2 bg-muted rounded w-32" />
                          <div className="h-2 bg-muted rounded w-24" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-primary border-2 border-background" />
                    <div className="w-10 h-10 rounded-full bg-accent border-2 border-background" />
                    <div className="w-10 h-10 rounded-full bg-secondary border-2 border-background" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
