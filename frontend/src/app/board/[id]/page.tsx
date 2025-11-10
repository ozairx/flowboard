'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import { useParams } from 'next/navigation';

export default function BoardDetailPage() {
  const params = useParams();
  const { id } = params;

  return (
    <AuthGuard>
      <div>
        <h1>Board Detail Page for ID: {id}</h1>
        <p>This is the detail page for board {id}.</p>
      </div>
    </AuthGuard>
  );
}
