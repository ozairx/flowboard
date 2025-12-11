'use client';

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

interface BoardCardProps {
  board: {
    id: string;
    title: string;
    cardCount: number;
  };
}

export default function BoardCard({ board }: BoardCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/board/${board.id}`);
  };

  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement rename functionality
    prompt('Novo nome do quadro:');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement delete functionality
    confirm('Tem certeza que deseja excluir este quadro?');
  };

  return (
    <Card
      onClick={handleCardClick}
      className="p-6 cursor-pointer hover:shadow-lg transition-shadow group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {board.title}
          </h3>
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
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleRename}>
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
