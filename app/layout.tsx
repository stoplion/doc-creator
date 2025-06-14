import type { Metadata } from "next"
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
    <html lang="en" className="dark bg-zinc-900">
      <body>{children}</body>
    </html>
  )
}
