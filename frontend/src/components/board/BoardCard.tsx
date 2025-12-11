'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import boardService from '@/services/boardService';

interface Board {
  id: string;
  title: string;
  cardCount: number;
}

interface BoardCardProps {
  board: Board;
  onBoardUpdate: (updatedBoard: Board) => void;
  onDeleteClick: (board: Board) => void;
}

export default function BoardCard({ board, onBoardUpdate, onDeleteClick }: BoardCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const len = inputRef.current.value.length;
          inputRef.current.setSelectionRange(len, len);
        }
      }, 0);
      return () => clearTimeout(timer); // Cleanup function
    }
  }, [isEditing]);

  const handleCardClick = () => {
    if (!isEditing) {
      router.push(`/board/${board.id}`);
    }
  };

  const handleRenameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleSave = async () => {
    setIsEditing(false);
    const trimmedTitle = title.trim();
    if (trimmedTitle === '' || trimmedTitle === board.title) {
      setTitle(board.title);
      return;
    }

    try {
      const updatedBoard = await boardService.updateBoard(board.id, {
        title: trimmedTitle,
      });
      onBoardUpdate({ ...board, ...updatedBoard });
    } catch (error) {
      setTitle(board.title);
      console.error('Failed to update board title', error);
      alert('Falha ao atualizar o título do quadro.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setTitle(board.title);
      setIsEditing(false);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteClick(board);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="p-6 cursor-pointer hover:shadow-lg transition-shadow group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 mr-2">
          {isEditing ? (
            <input
              ref={inputRef}
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleSave}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-auto p-0 text-xl font-semibold bg-accent/20 border-none focus-visible:ring-0 focus:outline-none"
            />
          ) : (
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {title}
            </h3>
          )}
          <p className="text-sm text-muted-foreground mt-1">
            {board.cardCount} cartão{board.cardCount !== 1 ? 's' : ''}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuItem onClick={handleRenameClick}>
              <Edit2 className="w-4 h-4 mr-2" />
              Renomear
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="h-24 bg-secondary rounded-md opacity-50" />
    </Card>
  );
}
