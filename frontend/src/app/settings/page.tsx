'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import Sidebar from '@/components/layout/Sidebar';

export default function SettingsPage() {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-auto p-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações da sua conta e do aplicativo.</p>
          {/* Add your settings components here */}
        </main>
      </div>
    </AuthGuard>
  );
}
