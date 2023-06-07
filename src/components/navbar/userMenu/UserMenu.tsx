"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import Avatar from "@/components/avatar";
import MenuItem from "@/components/navbar/menuItem";
import { UserMenuProps } from "@/commons/typescripts";
import { AiOutlineMenu } from "react-icons/ai";
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const onRent = () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        rentModal.onOpen();
    };

    const userMenuItems = currentUser ? (
        <>
            <MenuItem
                onClick={() => {
                    router.push("/trips");
                    toggleOpen();
                }}
                label="My trips"
            />
            <MenuItem
                onClick={() => {
                    router.push("/favorites");
                    toggleOpen();
                }}
                label="My favorites"
            />
            <MenuItem
                onClick={() => {
                    router.push("/reservations");
                    toggleOpen();
                }}
                label="My reservations"
            />
            <MenuItem
                onClick={() => {
                    router.push("/properties");
                    toggleOpen();
                }}
                label="My properties"
            />
            <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
            <hr />
            <MenuItem
                onClick={() => {
                    signOut();
                    toggleOpen();
                }}
                label="Logout"
            />
        </>
    ) : (
        <>
            <MenuItem
                onClick={() => {
                    loginModal.onOpen();
                    toggleOpen();
                }}
                label="Login"
            />
            <MenuItem
                onClick={() => {
                    registerModal.onOpen();
                    toggleOpen();
                }}
                label="Sign up"
            />
        </>
    );
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    className="
                        hidden
                        md:block 
                        text-sm 
                        font-semibold 
                        py-3 
                        px-4 
                        rounded-full 
                        hover:bg-neutral-100 
                        transition 
                        cursor-pointer"
                    onClick={onRent}
                >
                    Airbnb your home
                </div>
                <div
                    className="
                    p-4
                    md:py-1
                    md:px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    cursor-pointer
                    hover:shadow-md
                    transition
                "
                    onClick={toggleOpen}
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image as string} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className="
                    absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-16
                    md:top-12
                    lg:top-12
                    text-sm
                "
                >
                    <div className="flex flex-col cursor-pointer">
                        {userMenuItems}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
