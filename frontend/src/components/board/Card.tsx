import { Card as ShadcnCard, CardContent } from '@/components/ui/card';

interface CardProps {
  card: {
    id: string;
    title: string;
  };
}

export default function Card({ card }: CardProps) {
  return (
    <ShadcnCard className="mb-2">
      <CardContent className="p-2">
        <p>{card.title}</p>
      </CardContent>
    </ShadcnCard>
  );
}
