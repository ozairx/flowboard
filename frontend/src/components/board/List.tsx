import Card from './Card';
import { Card as ShadcnCard, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';

interface ListProps {
  list: {
    id: string;
    title: string;
    cards: {
      id: string;
      title: string;
      order: number;
    }[];
  };
}

export default function List({ list }: ListProps) {
  const { attributes, listeners, setNodeRef: setSortableNodeRef, transform, transition } = useSortable({ id: list.id });
  const { setNodeRef: setDroppableNodeRef } = useDroppable({ id: list.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setSortableNodeRef} style={style} {...attributes} {...listeners}>
      <ShadcnCard data-testid={`list-${list.id}`} className="w-[272px] mr-4 flex-shrink-0">
        <CardHeader className="p-2">
          <CardTitle className="text-base">{list.title}</CardTitle>
        </CardHeader>
        <div ref={setDroppableNodeRef}>
          <SortableContext items={list.cards.map(card => card.id)} strategy={verticalListSortingStrategy}>
            {list.cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </SortableContext>
        </div>
      </ShadcnCard>
    </div>
  );
}
