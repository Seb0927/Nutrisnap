'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Mic, Square } from 'lucide-react'
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import { answerQuestion } from '@/helpers/aiModels';

export function Assistant() {
  const [firstTouch, setFirstTouch] = useState(false);
  const [answer, setAnswer] = useState("");

  //Text to speech
  const speakText = (text: string) => {
    const subscriptionKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
    const region = process.env.NEXT_PUBLIC_AZURE_REGION;

    if (!subscriptionKey || !region) {
      console.error("Azure Speech Service key or region is not defined");
      return;
    }

    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, region);
    speechConfig.speechSynthesisVoiceName = "es-ES-AlvaroNeural";
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(
      text,
      result => {
        if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
          console.log("Speech synthesis succeeded.");
        } else {
          console.error("Speech synthesis error:", result.errorDetails);
        }
        synthesizer.close();
      },
      error => {
        console.error("Speech synthesis error:", error);
        synthesizer.close();
      }
    );
  };


  const [isRecording, setIsRecording] = useState(false)

  const [text, setText] = useState("");
  const [recognizer, setRecognizer] = useState<SpeechSDK.SpeechRecognizer | null>(null);

  useEffect(() => {
    const subscriptionKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
    const region = process.env.NEXT_PUBLIC_AZURE_REGION;

    if (!subscriptionKey || !region) {
      console.error("Azure Speech Service key or region is not defined");
      return;
    }

    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, region);
    speechConfig.speechRecognitionLanguage = "es-ES";
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const newRecognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    setRecognizer(newRecognizer);

    return () => {
      newRecognizer.close();
    };
  }, []);

  const startRecognition = () => {
    if (!recognizer) {
      console.error("Speech recognizer is not initialized");
      return;
    }

    setIsRecording(true);
    setText("");

    recognizer.recognizeOnceAsync(
      async result => {
        if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
          setText(result.text);
          //LLamado a gemini para responder la pregunta
          const getResponse = async () => {
            const response = await answerQuestion(result.text);
            return response;
          };
          const response = await getResponse();
          setAnswer(response);
          speakText(response);
          setFirstTouch(true);
        } else {
          console.error("Speech recognition error:", result.errorDetails);
        }
        setIsRecording(false);
      },
      error => {
        console.error("Speech recognition error:", error);
        setIsRecording(false);
      }
    );
  };

  const stopRecognition = () => {
    if (recognizer) {
      recognizer.stopContinuousRecognitionAsync();
      setIsRecording(false);
    }
  };




  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-bold mb-12 text-center text-[#8c7851]">Asistente Nutrisnap</h1>
      <Button
        size="lg"
        className={`w-24 h-24 rounded-full transition-colors duration-300 ${isRecording ? 'bg-[#5c4f3c]' : 'bg-[#8c7851] hover:bg-[#5c4f3c]'
          }`}
        onClick={isRecording ? stopRecognition : startRecognition}
        aria-label={isRecording ? "Parar grabación" : "Empezar grabación"}
      >
        {isRecording ? (
          <Square className="w-12 h-12 text-white" />
        ) : (
          <Mic className="w-24 h-24 text-white" />
        )}
      </Button>
      <p className="mt-8 text-center text-[#5c4f3c] max-w-md">
        Hablame y te responderé como tu asistente nutricional
      </p>
      <p className="mt-8 text-center  max-w-md font-bold">
        {text}
      </p>
      <p className="mt-8 text-center text-[#757471] max-w-md">
        {answer}
      </p>
    </div>
  )
}