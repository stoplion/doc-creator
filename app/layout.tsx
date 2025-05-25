import type { Metadata } from "next"
// import { Navbar } from "../components/Navbar"
// ;<Navbar />
import "./globals.css"

export const metadata: Metadata = {
  title: "Your App Title",
  description: "Your app description",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
