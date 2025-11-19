'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Layers, Layout, Zap } from 'lucide-react';
import authService from '@/services/authService';
import { useAuthStore } from '@/store/auth';
import Link from 'next/link';

export function AuthPage() {
  const searchParams = useSearchParams();
  const initialForm = searchParams.get('form');
  const [isLogin, setIsLogin] = useState(initialForm !== 'register');
  const router = useRouter();
  const storeLogin = useAuthStore((state) => state.login);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await authService.login({ email, password });
      storeLogin(response.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Falha no login');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await authService.register({ name, email, password });
      storeLogin(response.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Falha no cadastro');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row justify-center">
      {/* Left Panel - Decorative */}
      <div className="relative hidden lg:flex w-full flex-col justify-between overflow-hidden bg-primary p-8 text-primary-foreground lg:w-1/2 lg:p-12">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/20 blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
              <Layers className="h-6 w-6" />
            </div>
            <Link href='/'>Flowboard</Link>
          </div>
        </div>

        <div className="relative z-10 my-12 flex flex-1 flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold leading-tight lg:text-6xl">
            Organize seus projetos com fluidez.
          </h1>
          <p className="max-w-md text-lg text-primary-foreground/80 lg:text-xl">
            A plataforma intuitiva para equipes que buscam produtividade e
            clareza em cada etapa do processo.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <span>Gerenciamento visual de tarefas</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Layout className="h-5 w-5" />
              </div>
              <span>Dashboards personalizáveis</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Zap className="h-5 w-5" />
              </div>
              <span>Automação de fluxo de trabalho</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-primary-foreground/60">
          © 2025 Flowboard Inc. Todos os direitos reservados.
        </div>
      </div>

      {/* Right Panel - Auth Forms */}
      <div className="flex w-full items-center justify-center bg-background p-8 lg:w-1/2 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {isLogin
                ? 'Entre na sua conta Flowboard para continuar organizando seus projetos.'
                : 'É rápido e fácil. Comece a organizar seus projetos hoje mesmo.'}
            </p>
          </div>

          <div className="relative h-80">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full"
                >
                  <form className="space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-input/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Sua senha"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-input/50"
                      />
                      <div className="flex justify-end">
                        <a
                          href="#"
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Esqueceu sua senha?
                        </a>
                      </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" className="w-full text-base">
                      Entrar
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full"
                >
                  <form className="space-y-6" onSubmit={handleRegister}>
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome completo"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-input/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-input/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Senha</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Crie uma senha forte"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-input/50"
                      />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" className="w-full text-base">
                      Criar conta grátis
                    </Button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continue com
              </span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            {isLogin ? (
              <p>
                Não tem uma conta?{' '}
                <button
                  onClick={toggleForm}
                  className="font-bold text-primary hover:underline focus:outline-none cursor-pointer"
                >
                  Cadastre-se
                </button>
              </p>
            ) : (
              <p>
                Já tem uma conta?{' '}
                <button
                  onClick={toggleForm}
                  className="font-bold text-primary hover:underline focus:outline-none cursor-pointer"
                >
                  Entrar
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
