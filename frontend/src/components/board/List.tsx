import Card from './Card';
import { Card as ShadcnCard, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ListProps {
  list: {
    id: string;
    title: string;
    cards: {
      id: string;
      title: string;
    }[];
  };
}

export default function List({ list }: ListProps) {
  return (
    <ShadcnCard className="w-[272px] mr-4 flex-shrink-0">
      <CardHeader className="p-2">
        <CardTitle className="text-base">{list.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        {list.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </CardContent>
    </ShadcnCard>
  );
}
