import { Quote } from 'lucide-react';

export function Testimonial() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Quote className="w-12 h-12 text-primary mx-auto" />
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium leading-relaxed text-balance">
            O Flowboard transformou a maneira como nossa equipe gerencia
            projetos. É simples, visual e incrivelmente poderoso.
          </blockquote>
          <div className="space-y-2">
            <p className="text-lg font-sans font-semibold text-foreground">
              Ana Silva
            </p>
            <p className="text-muted-foreground">
              CEO de uma Startup de Tecnologia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
