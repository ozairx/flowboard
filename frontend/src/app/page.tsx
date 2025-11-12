'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white dark:bg-gray-950 shadow-sm">
        <Link href="/" className="flex items-center justify-center">
          <span className="text-xl font-bold">Flowboard</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Entrar
          </Link>
          <Button asChild>
            <Link href="/register">Cadastre-se</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-gray-950">
          <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
            <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
          </div>
          <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
            <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
          </div>

          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="relative z-10 mx-auto max-w-4xl text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
                {'Organize seu trabalho, sua vida e tudo mais.'
                  .split(' ')
                  .map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: 'easeInOut',
                      }}
                      className="mr-2 inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
              </h1>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.8,
                }}
                className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
              >
                Flowboard é a ferramenta visual que permite que sua equipe gerencie qualquer tipo de projeto, fluxo de trabalho ou monitoramento de tarefas.
              </motion.p>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: 1,
                }}
                className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
              >
                <Button asChild size="lg">
                  <Link href="/register">Comece agora - É grátis</Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 1.2,
                }}
                className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
                  <img
                    src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2560&auto=format&fit=crop"
                    alt="Landing page preview"
                    className="aspect-[16/9] h-auto w-full object-cover"
                    height={1000}
                    width={1000}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Funcionalidades para o sucesso
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Flowboard vem com um conjunto de funcionalidades para ajudar você e sua equipe a se manterem organizados e produtivos.
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
                  <p>Visualize tarefas, projetos e fluxos de trabalho com quadros, listas e cartões fáceis de usar.</p>
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
                  <p>Mova tarefas entre as listas com uma interface simples de arrastar e soltar.</p>
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
                  <p>Trabalhe com sua equipe em tempo real e veja as atualizações instantaneamente.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Flowboard. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
