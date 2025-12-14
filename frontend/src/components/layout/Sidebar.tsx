'use client';

import {
  ChevronsLeft,
  ChevronsRight,
  Home,
  Settings,
  LifeBuoy,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { useUIStore } from '@/store/ui';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const logout = useAuthStore((state) => state.logout);
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  return (
    <aside
      className={cn(
        'bg-gray-900 text-white p-4 flex flex-col transition-all duration-300 relative',
        isSidebarCollapsed ? 'w-20' : 'w-64',
      )}
    >
      <div className="mb-8">
        <h1
          className={cn(
            'text-2xl font-bold cursor-pointer px-4',
            isSidebarCollapsed && 'px-0 text-center',
          )}
          onClick={() => {
            if (router.pathname === '/dashboard') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              router.push('/dashboard');
            }
          }}
        >
          {isSidebarCollapsed ? 'F' : 'Flowboard'}
        </h1>
      </div>

      <nav className="flex-1 flex flex-col justify-between pb-4">
        <ul>
          <li>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-2',
                  isSidebarCollapsed && 'size-12 justify-center p-0',
                )}
                title="Dashboard"
              >
                <Home style={{ width: '1.25rem', height: '1.25rem' }} />
                {!isSidebarCollapsed && (
                  <span className="whitespace-nowrap">Dashboard</span>
                )}
              </Button>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/settings">
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-2',
                  isSidebarCollapsed && 'size-12 justify-center p-0',
                )}
                title="Configurações"
              >
                <Settings style={{ width: '1.25rem', height: '1.25rem' }} />
                {!isSidebarCollapsed && (
                  <span className="whitespace-nowrap">Configurações</span>
                )}
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/help">
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-2',
                  isSidebarCollapsed && 'size-12 justify-center p-0',
                )}
                title="Ajuda"
              >
                <LifeBuoy style={{ width: '1.25rem', height: '1.25rem' }} />
                {!isSidebarCollapsed && (
                  <span className="whitespace-nowrap">Ajuda</span>
                )}
              </Button>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Moved and restyled toggle button */}
      <Button
        variant="ghost"
        size="icon-sm"
        className={cn(
          'absolute top-10 -right-3 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white z-10',
          'hidden md:flex items-center justify-center', // Show only on medium screens and up
        )}
        onClick={toggleSidebar}
      >
        <ChevronsLeft
          className={cn(
            'w-4 h-4 transition-transform duration-300',
            isSidebarCollapsed && 'rotate-180',
          )}
        />
      </Button>

      <div className="mt-auto">
        {' '}
        {/* Added mt-auto to push content to bottom */}
        <div className="border-t border-gray-700 my-4"></div>
        <div
          className={cn(
            'flex items-center gap-3 mb-4 px-2',
            isSidebarCollapsed && 'justify-center px-0',
          )}
        >
          <div className="w-8 h-8 rounded-full bg-gray-700"></div>
          {!isSidebarCollapsed && (
            <div>
              <p className="font-semibold">Usuário</p>
              <p className="text-sm text-gray-400">user@example.com</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start gap-2',
            isSidebarCollapsed && 'size-12 justify-center p-0',
          )}
          onClick={handleLogout}
          title="Sair"
        >
          <LogOut style={{ width: '1.25rem', height: '1.25rem' }} />
          {!isSidebarCollapsed && (
            <span className="whitespace-nowrap">Sair</span>
          )}
        </Button>
      </div>
    </aside>
  );
}
