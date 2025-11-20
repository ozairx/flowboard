import Link from 'next/link'
import { Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-sans font-bold">Flowboard</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A ferramenta visual que transforma a maneira como você gerencia
              projetos e tarefas.
            </p>
          </div>

          {/* Column 2: Produto */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-foreground">Produto</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/funcionalidades"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link
                  href="/precos"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Preços
                </Link>
              </li>
              <li>
                <Link
                  href="/integracoes"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Integrações
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Empresa */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-foreground">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sobre"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/termos"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Flowboard. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
