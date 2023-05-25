import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import RegisterModal from "@/components/registerModal";
import ToastProvider from "./providers/toastProvider/ToastProvider";

export const metadata = {
    title: "Booking Travel",
    description: "Make you move, make your live",
};

const font = Nunito({
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={font.className}>
                <Navbar />
                <ToastProvider />
                <RegisterModal />
                {children}
            </body>
        </html>
    );
}
