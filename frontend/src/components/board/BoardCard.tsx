import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface BoardCardProps {
  board: {
    id: string;
    title: string;
  };
}

export default function BoardCard({ board }: BoardCardProps) {
  return (
    <Link href={`/board/${board.id}`}>
      <Card className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
        <CardHeader>
          <CardTitle>{board.title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
