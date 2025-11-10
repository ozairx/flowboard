'use client';

import AuthGuard from '@/components/auth/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div>
        <h1>Dashboard Page</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </AuthGuard>
  );
}
