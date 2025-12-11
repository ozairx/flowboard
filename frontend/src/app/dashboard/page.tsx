'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/auth/AuthGuard';
import BoardCard from '@/components/board/BoardCard';
import boardService from '@/services/boardService';
import Sidebar from '@/components/layout/Sidebar';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Board {
  id: string;
  title: string;
  cardCount: number;
}

export default function DashboardPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const data = await boardService.getBoards();
        setBoards(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch boards');
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  const handleBoardUpdate = (updatedBoard: Board) => {
    setBoards(
      boards.map((board) =>
        board.id === updatedBoard.id ? updatedBoard : board,
      ),
    );
  };

  const filteredBoards = boards.filter((board) =>
    board.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AuthGuard>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Meus Quadros
              </h1>
              <p className="text-muted-foreground">
                Gerencie seus projetos e tarefas
              </p>
            </div>

            {/* Search and Create */}
            <div className="flex gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar quadros..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => {}} className="gap-2">
                <Plus className="w-5 h-5" />
                Criar Novo Quadro
              </Button>
            </div>

            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Boards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBoards.map((board) => (
                <BoardCard
                  key={board.id}
                  board={{ ...board, cardCount: 0 }} // Mocking cardCount
                  onBoardUpdate={handleBoardUpdate}
                />
              ))}
            </div>

            {filteredBoards.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhum quadro encontrado
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
