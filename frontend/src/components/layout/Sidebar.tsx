'use client';

import { Home, Settings, LifeBuoy, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="mb-8">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold">Flowboard</h1>
        </Link>
      </div>

      <nav className="flex-1 flex flex-col justify-between pb-4">
        <ul>
          <li>
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Home className="w-5 h-5" />
                Dashboard
              </Button>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="w-5 h-5" />
                Configurações
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/help">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LifeBuoy className="w-5 h-5" />
                Ajuda
              </Button>
            </Link>
          </li>
        </ul>
      </nav>

      <div>
        <div className="border-t border-gray-700 mb-4"></div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-700"></div>
          <div>
            <p className="font-semibold">Usuário</p>
            <p className="text-sm text-gray-400">user@example.com</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Sair
        </Button>
      </div>
    </aside>
  );
}

