'use client'

import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import { useUser } from "@/context/UserContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export function SignIn() {
  const { user, setUser } = useUser();
  console.log(user)
  const router = useRouter()

  const handleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const userInfo = result.user;
        const loggedUser = {
            uid: userInfo.uid,
            email: userInfo.email,
            displayName: userInfo.displayName,
            photoURL: userInfo.photoURL
        }
        setUser(loggedUser);
        router.push('/upload')
    } catch (error) {
        console.error("Error al iniciar sesión con Google: ", error);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f5ed] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-[#c0b9a8]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-[#8c7851]">Bienvenido a Nutrisnap</CardTitle>
          <CardDescription className="text-[#5c4f3c]">
            Escoge tu inicio de sesión preferido:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button
              onClick={handleSignUp}
              className="w-full bg-white text-[#5c4f3c] border-2 border-[#c0b9a8] hover:bg-[#f8f5ed] transition-colors duration-300"
              variant="outline"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Inicia sesión con Google
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Separator className="flex-1 bg-[#c0b9a8]" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm text-[#5c4f3c]">
              ¿No tienes una cuenta de Google?{" "}
              <Link href="https://accounts.google.com/SignUp" className="text-[#8c7851] hover:underline">
                Crea una
              </Link>
            </p>
          </div>
          <p className="text-xs text-center text-[#5c4f3c]">
            Al momento de iniciar sesión, aceptas nuestros{" "}
            <Link href="/" className="text-[#8c7851] hover:underline">
              Términos de servicio
            </Link>{" "}
            y{" "}
            <Link href="/" className="text-[#8c7851] hover:underline">
              Política de privacidad
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
