import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation } from './components/Navigation/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Next testing', //Esto es lo mismo que utilizar head > title
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navigation />
                <div className="container">
                    {children}
                </div>
            </body>
        </html>
    )
}
