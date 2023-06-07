"use client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Modal from "@/components/modals/modal";
import Heading from "@components/heading";
import Button from "@components/button";
import { Input } from "@components/input";
const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn("credentials", { ...data, redirect: false }).then((callback) => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.success("Logged in");
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };

    const toggle = () => {
        loginModal.onClose();
        registerModal.onOpen();
    };

    const bodyContent = (
        <div className="flex flex-col gap-1.5">
            <Heading
                title="Welcome to Booking app"
                subTitle="Enter your credentials"
            />
            <Input
                id="email"
                label="Email"
                regiter={register}
                disabled={isLoading}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                regiter={register}
                disabled={isLoading}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn("google")}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn("github")}
            />
            <div
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
            >
                <div
                    className="
                            justify-center
                            flex
                            flex-row
                            items-center
                            gap-2
                        "
                >
                    <div>First time using Booking?</div>
                    <div
                        onClick={toggle}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
