"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/dashboard">
        <h1 className="text-xl font-bold">Flowboard</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {isAuthenticated && (
          <Button variant="destructive" onClick={handleLogout}>
            Sair
          </Button>
        )}
      </div>
    </nav>
  );
}
