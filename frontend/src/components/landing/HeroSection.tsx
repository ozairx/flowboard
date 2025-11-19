'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

const HeroSection = () => {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-gray-950">
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>

      <div className="container px-4 md:px-6 m-auto">
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
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-xl font-normal text-neutral-600 dark:text-neutral-400"
          >
            Flowboard é a ferramenta visual que permite que sua equipe gerencie
            qualquer tipo de projeto, fluxo de trabalho ou monitoramento de
            tarefas.
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
            className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild size="lg">
              <Link href="/register" className='text-xl'>Comece agora - É grátis</Link>
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
  );
};

export default HeroSection;
