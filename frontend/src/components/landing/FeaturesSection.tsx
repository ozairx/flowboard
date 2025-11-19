'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 m-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Funcionalidades para o sucesso
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 pt-4">
              Flowboard vem com um conjunto de funcionalidades para ajudar você
              e sua equipe a se manterem organizados e produtivos.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Quadros Visuais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Visualize tarefas, projetos e fluxos de trabalho com quadros,
                listas e cartões fáceis de usar.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Arrastar e Soltar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Mova tarefas entre as listas com uma interface simples de
                arrastar e soltar.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Colaboração em Tempo Real
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Trabalhe com sua equipe em tempo real e veja as atualizações
                instantaneamente.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
