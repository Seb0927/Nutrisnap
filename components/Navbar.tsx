'use client'

import Link from 'next/link'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, MessageSquare, LogOut } from 'lucide-react'

export function Navbar() {

  const { user, setUser } = useUser();

  const router = useRouter()

  const handleLogout = () => {
    setUser(null);
    router.push('/');
  }

  return (
    <nav className="bg-white border-b border-[rgb(192,185,168)] py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/upload" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-[#8c7851]">Nutrisnap</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/upload">
            <Button variant="ghost" className="text-[#5c4f3c] hover:text-[#8c7851] hover:bg-[#f8f5ed]">
              <Upload className="mr-2 h-4 w-4" />
              Subir
            </Button>
          </Link>
          <Link href="/asistente">
            <Button variant="ghost" className="text-[#5c4f3c] hover:text-[#8c7851] hover:bg-[#f8f5ed]">
              <MessageSquare className="mr-2 h-4 w-4" />
              Asistente inteligente
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={user?.photoURL || ''} alt="User" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <Button onClick={handleLogout} variant="ghost" size="icon" className="text-[#5c4f3c] hover:text-[#8c7851] hover:bg-[#f8f5ed]">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Cerrar sesión</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}