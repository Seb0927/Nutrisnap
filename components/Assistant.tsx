'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Mic, Square } from 'lucide-react'

export function Assistant() {
  const [isRecording, setIsRecording] = useState(false)

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-bold mb-12 text-center text-[#8c7851]">Asistente Nutrisnap</h1>
      <Button 
        size="lg"
        className={`w-24 h-24 rounded-full transition-colors duration-300 ${
          isRecording ? 'bg-[#5c4f3c]' : 'bg-[#8c7851] hover:bg-[#5c4f3c]'
        }`}
        onClick={toggleRecording}
        aria-label={isRecording ? "Parar grabación" : "Empezar grabación"}
      >
        {isRecording ? (
          <Square className="w-12 h-12 text-white" />
        ) : (
          <Mic className="w-24 h-24 text-white" />
        )}
      </Button>
      <p className="mt-8 text-center text-[#5c4f3c] max-w-md">
        {isRecording 
          ? "Estoy escuchando. Dale click al botón de nuevo para parar la grabación." 
          : "Hablame y te responderé como tu asistente nutricional"}
      </p>
    </div>
  )
}