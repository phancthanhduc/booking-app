"use client";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Input } from "@components/input";
import { toast } from "react-hot-toast";
import Heading from "@components/heading";
import Modal from "@/components/modals/modal";
import Button from "@components/button";
const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios
            .post("/api/register", data)
            .then(() => {
                toast.success("Successed!");
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error("Something went wrong.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const toggle = () => {
        registerModal.onClose();
        loginModal.onOpen();
    };

    const bodyContent = (
        <div className="flex flex-col gap-1.5">
            <Heading
                title="Welcome to Booking app"
                subTitle="Create an account"
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
                id="name"
                label="Name"
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
                    <div>Already have an account?</div>
                    <div
                        onClick={toggle}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
            isScroll
        />
    );
};

export default RegisterModal;
