'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/auth/AuthGuard';
import Sidebar from '@/components/layout/Sidebar';
import { useAuthStore } from '@/store/auth';
import authService from '@/services/authService';

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (!user) {
      const fetchProfile = async () => {
        try {
          const profile = await authService.getUserProfile();
          setUser(profile);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [user, setUser]);

  return (
    <AuthGuard>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-auto p-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Perfil</h1>
          <p className="text-muted-foreground mb-6">Gerencie suas informações de perfil.</p>

          {loading ? (
            <p>Carregando perfil...</p>
          ) : user ? (
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Nome</p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-red-500">Não foi possível carregar o perfil do usuário.</p>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
