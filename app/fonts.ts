"use client"
import { Kaushan_Script, Source_Sans_3 } from "next/font/google";
export const kaushan = Kaushan_Script({
    variable: "--font-kaushan-script",
    subsets: ["latin"],
    weight: "400",
});

// app/fonts.ts

export const sourceSans3 = Source_Sans_3({
    subsets: ['latin'],
    weight: ['400', '600', '700'], // اختر الأوزان التي تحتاجها
    display: 'swap',
})


