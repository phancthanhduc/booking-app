"use client";
import { NavbarProps } from "@/commons/typescripts";
import Container from "@/components/container";
import Logo from "@components/navbar/logo";
import Search from "@components/navbar/search";
import UserMenu from "@components/navbar/userMenu";
import Categories from "@/components/navbar/categories/Categories";

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row justify-between items-center gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    );
};

export default Navbar;
