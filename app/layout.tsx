import "./globals.css"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { RecipeProvider } from "@/contexts/RecipeContext"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <RecipeProvider>
              {children}
            </RecipeProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
