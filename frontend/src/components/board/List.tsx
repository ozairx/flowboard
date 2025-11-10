import Card from './Card';
import { Card as ShadcnCard, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Droppable, Draggable } from '@hello-pangea/dnd';

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
  return (
    <ShadcnCard className="w-[272px] mr-4 flex-shrink-0">
      <CardHeader className="p-2">
        <CardTitle className="text-base">{list.title}</CardTitle>
      </CardHeader>
      <Droppable droppableId={list.id} type="card">
        {(provided) => (
          <CardContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="p-2"
          >
            {list.cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <Card card={card} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </CardContent>
        )}
      </Droppable>
    </ShadcnCard>
  );
}
