import "./globals.css"
import { Pacifico } from "next/font/google"
import type React from "react"

const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
})

export const metadata = {
  title: "Happy Birthday Chipklu!",
  description: "A super impressive birthday surprise for Chipklu",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${pacifico.className} cursor-none`}>
        <div className="custom-cursor"></div>
        {children}
      </body>
    </html>
  )
}

