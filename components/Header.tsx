import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, MessageSquare, LogOut } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="bg-white border-b border-[rgb(192,185,168)] py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-[#8c7851]">Nutrisnap</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-[#5c4f3c] hover:text-[#8c7851] hover:bg-[#f8f5ed]">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button variant="ghost" className="text-[#5c4f3c] hover:text-[#8c7851] hover:bg-[#f8f5ed]">
            <MessageSquare className="mr-2 h-4 w-4" />
            AI Assistant
          </Button>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="text-[#5c4f3c] hover:text-[#8c7851] hover:bg-[#f8f5ed]">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Close Session</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}