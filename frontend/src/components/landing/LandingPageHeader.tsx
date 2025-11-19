'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const LandingPageHeader = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-white dark:bg-gray-950 shadow-sm">
      <div className="container mx-auto mt-auto flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center">
          <span className="text-xl font-bold">Flowboard</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Entrar
          </Link>
          <Button asChild>
            <Link href="/register">Cadastre-se</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default LandingPageHeader;
