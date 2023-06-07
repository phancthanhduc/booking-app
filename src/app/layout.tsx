import "./globals.css";
import { Nunito } from "next/font/google";
import getCurrentUser from "@app/actions/getCurrentUser";
import NextAuthProvider from "@components/nextAuthProvider/NextAuthProvider";
import Navbar from "@components/navbar/Navbar";
import RegisterModal from "@components/modals/registerModal";
import ToastProvider from "@app/providers/toastProvider/ToastProvider";
import LoginModal from "@components/modals/loginModal";
import RentModal from "@components/modals/rentModal";
import SearchModal from "@/components/modals/searchModal";
import { SafeUser } from "@/commons/typescripts";

export const metadata = {
    title: "Booking Travel",
    description: "Make you move, make your live",
};

const font = Nunito({
    subsets: ["latin"],
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className={font.className}>
                <NextAuthProvider>
                    <Navbar currentUser={currentUser as SafeUser} />
                    <ToastProvider />
                    <LoginModal />
                    <RegisterModal />
                    <SearchModal />
                    <RentModal />
                    <div className="pb-20 pt-28">{children}</div>
                </NextAuthProvider>
            </body>
        </html>
    );
}
