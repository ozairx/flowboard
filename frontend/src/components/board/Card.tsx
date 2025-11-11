import { Card as ShadcnCard, CardContent } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CardProps {
  card: {
    id: string;
    title: string;
  };
}

export default function Card({ card }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ShadcnCard ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-2">
      <CardContent className="p-2">
        <p>{card.title}</p>
      </CardContent>
    </ShadcnCard>
  );
}
