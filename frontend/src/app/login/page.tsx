'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import authService from '@/services/authService';
import { useAuthStore } from '@/store/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await authService.login({ email, password });
      login(response.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Falha no login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Entrar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full cursor-pointer">
                Entrar
              </Button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm">
            Não tem uma conta?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Cadastre-se
            </a>
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 text-center">
              <Button
                className="cursor-pointer"
                variant="link"
                onClick={() => {
                  setEmail('seed-user@example.com');
                  setPassword('password123');
                }}
              >
                Preencher com dados de teste
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
