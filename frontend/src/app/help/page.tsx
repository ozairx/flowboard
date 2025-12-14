'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import Sidebar from '@/components/layout/Sidebar';

export default function HelpPage() {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-auto p-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Ajuda</h1>
          <p className="text-muted-foreground">Encontre ajuda e suporte para usar o Flowboard.</p>
          {/* Add your help components here */}
        </main>
      </div>
    </AuthGuard>
  );
}
