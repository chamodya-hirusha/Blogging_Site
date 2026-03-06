import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "@/components/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "LearnFlow",
    description: "Modern Blogging Platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans antialiased`}>
                <QueryProvider>
                    <TooltipProvider>
                        {children}
                        <Toaster />
                        <Sonner />
                    </TooltipProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
