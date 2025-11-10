'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import List from '@/components/board/List';
import boardService from '@/services/boardService';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import listService from '@/services/listService';
import cardService from '@/services/cardService';

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
      const fetchBoard = async () => {
        try {
          const data = await boardService.getBoardById(id as string);
          // Ensure lists and cards are sorted by order
          data.lists.sort((a: List, b: List) => a.order - b.order);
          data.lists.forEach((list: List) => {
            list.cards.sort((a: Card, b: Card) => a.order - b.order);
          });
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

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    // Reordering lists
    if (type === 'list') {
      const newLists = Array.from(board!.lists);
      const [reorderedList] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, reorderedList);

      const updatedLists = newLists.map((list, index) => ({
        ...list,
        order: index,
      }));

      setBoard({
        ...board!,
        lists: updatedLists,
      });

      try {
        await listService.reorderLists(board!.id, updatedLists);
      } catch (error) {
        setError('Failed to reorder lists');
        // Revert state if API call fails
        setBoard(board);
      }
      return;
    }

    // Reordering cards
    const sourceList = board!.lists.find(list => list.id === source.droppableId);
    const destinationList = board!.lists.find(list => list.id === destination.droppableId);

    if (!sourceList || !destinationList) {
      return;
    }

    // Moving cards within the same list
    if (sourceList === destinationList) {
      const newCards = Array.from(sourceList.cards);
      const [reorderedCard] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, reorderedCard);

      const updatedCards = newCards.map((card, index) => ({
        ...card,
        order: index,
      }));

      const newList = {
        ...sourceList,
        cards: updatedCards,
      };

      const newLists = board!.lists.map(list =>
        list.id === newList.id ? newList : list
      );

      setBoard({
        ...board!,
        lists: newLists,
      });

      try {
        await cardService.reorderCards(board!.id, sourceList.id, updatedCards);
      } catch (error) {
        setError('Failed to reorder cards');
        setBoard(board);
      }
    } else {
      // Moving cards between different lists
      const sourceCards = Array.from(sourceList.cards);
      const [movedCard] = sourceCards.splice(source.index, 1);

      const destinationCards = Array.from(destinationList.cards);
      destinationCards.splice(destination.index, 0, movedCard);

      const newSourceList = {
        ...sourceList,
        cards: sourceCards.map((card, index) => ({ ...card, order: index })),
      };

      const newDestinationList = {
        ...destinationList,
        cards: destinationCards.map((card, index) => ({ ...card, order: index })),
      };

      const newLists = board!.lists.map(list => {
        if (list.id === newSourceList.id) return newSourceList;
        if (list.id === newDestinationList.id) return newDestinationList;
        return list;
      });

      setBoard({
        ...board!,
        lists: newLists,
      });

      try {
        await cardService.reorderCards(board!.id, sourceList.id, newSourceList.cards);
        await cardService.reorderCards(board!.id, destinationList.id, newDestinationList.cards);
      } catch (error) {
        setError('Failed to reorder cards');
        setBoard(board);
      }
    }
  };

  return (
    <AuthGuard>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container mx-auto p-4">
          {loading && <p>Carregando...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {board && (
            <div>
              <h1 className="text-2xl font-bold mb-4">{board.title}</h1>
              <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex overflow-x-auto"
                  >
                    {board.lists.map((list, index) => (
                      <Draggable key={list.id} draggableId={list.id} index={index}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <List list={list} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </div>
      </DragDropContext>
    </AuthGuard>
  );
}
