import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-balance">
            Pronto para organizar seu fluxo?
          </h2>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6 font-sans"
          >
            <Link href="/auth?form=register">Comece a usar grátis</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
