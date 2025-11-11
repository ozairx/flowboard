'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import List from '@/components/board/List';
import boardService from '@/services/boardService';
import listService from '@/services/listService';
import cardService from '@/services/cardService';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';

interface Card {
  id: string;
  title: string;
  order: number;
}

interface List {
  id: string;
  title: string;
  order: number;
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
      console.log(`Fetching board with id: ${id}`);
      const fetchBoard = async () => {
        try {
          const data = await boardService.getBoardById(id as string);
          console.log('Board data:', data);
          // Ensure lists and cards are sorted by order
          data.lists.sort((a: List, b: List) => a.order - b.order);
          data.lists.forEach((list: List) => {
            list.cards.sort((a: Card, b: Card) => a.order - b.order);
          });
          setBoard(data);
        } catch (err: any) {
          console.error('Error fetching board:', err);
          setError(err.response?.data?.message || 'Failed to fetch board');
        } finally {
          setLoading(false);
        }
      };

      fetchBoard();
    }
  }, [id]);

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setBoard((board) => {
        if (!board) return board;

        const oldIndex = board.lists.findIndex((list) => list.id === active.id);
        const newIndex = board.lists.findIndex((list) => list.id === over.id);

        const newLists = arrayMove(board.lists, oldIndex, newIndex);

        const updatedLists = newLists.map((list, index) => ({
          ...list,
          order: index,
        }));

        try {
          listService.reorderLists(board.id, updatedLists);
        } catch (error) {
          setError('Failed to reorder lists');
          // Revert state if API call fails
          // This would require a more complex state management or re-fetching the board
        }

        return {
          ...board,
          lists: updatedLists,
        };
      });
    }
  };

  return (
    <AuthGuard>
      <DndContext onDragEnd={onDragEnd} collisionDetection={closestCorners}>
        <div className="container mx-auto p-4">
          {loading && <p>Carregando...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {board && (
            <div>
              <h1 className="text-2xl font-bold mb-4">{board.title}</h1>
              <SortableContext items={board.lists.map(list => list.id)} strategy={horizontalListSortingStrategy}>
                <div className="flex overflow-x-auto">
                  {board.lists.map((list) => (
                    <List key={list.id} list={list} />
                  ))}
                </div>
              </SortableContext>
            </div>
          )}
        </div>
      </DndContext>
    </AuthGuard>
  );
}
