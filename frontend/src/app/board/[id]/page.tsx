'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import List from '@/components/board/List';
import boardService from '@/services/boardService';

interface Card {
  id: string;
  title: string;
}

interface List {
  id: string;
  title: string;
  cards: Card[];
}

interface Board {
  id: string;
  title: string;
  lists: List[];
}

export default function BoardDetailPage() {
  const params = useParams();
  const { id } = params;
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchBoard = async () => {
        try {
          const data = await boardService.getBoardById(id as string);
          setBoard(data);
        } catch (err: any) {
          setError(err.response?.data?.message || 'Failed to fetch board');
        } finally {
          setLoading(false);
        }
      };

      fetchBoard();
    }
  }, [id]);

  return (
    <AuthGuard>
      <div className="container mx-auto p-4">
        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {board && (
          <div>
            <h1 className="text-2xl font-bold mb-4">{board.title}</h1>
            <div className="flex overflow-x-auto">
              {board.lists.map((list) => (
                <List key={list.id} list={list} />
              ))}
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
