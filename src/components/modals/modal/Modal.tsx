"use client";
import { useState, useEffect } from "react";
import { ModalProps } from "@/commons/typescripts";
import { IoMdClose } from "react-icons/io";
import Button from "@components/button";

const Modal: React.FC<ModalProps> = ({
    actionLabel,
    onClose,
    onSubmit,
    body,
    disabled,
    footer,
    isOpen,
    secondaryAction,
    secondaryActionLabel,
    title,
    isScroll,
}) => {
    const [showModal, setShowModal] = useState(isOpen);
    //Use effect to update showModal state
    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);
    const handleClose = () => {
        if (disabled) {
            return;
        }
        setShowModal(!isOpen);
        setTimeout(() => {
            onClose();
        }, 300);
    };
    const handleSubmit = () => {
        if (disabled) {
            return;
        }
        onSubmit();
    };
    const handleSecondaryAction = () => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction();
    };
    if (!isOpen) {
        return null;
    }
    return (
        <div
            className={`
                fixed
                flex
                justify-center
                items-center
                overflow-x-hidden
                overflow-y-auto
                inset-0
                z-50
                outline-none
                focus:outline-none
                bg-neutral-800/70
                `}
        >
            <div
                className="
                relative
                w-full
                md:w-4/6
                lg:w-3/6
                xl:w-2/5
                my-6
                mx-auto
                h-full
                lg:h-auto
                md:h-auto
                "
            >
                {/* Content */}
                <div
                    className={`translate duration-300 h-full
                        ${showModal ? "translate-y-0" : "translate-y-full"}
                        ${showModal ? "opacity-100" : "opacity-0"}
                    `}
                >
                    <div
                        className="
                            relative
                            flex
                            flex-col
                            h-full
                            lg:h-[90vh]
                            md:h-[90vh]
                            w-full
                            translate
                            border-0
                            rounded-lg
                            shadow-lg
                            bg-white
                            outline-none
                            focus:outline-none

                        "
                    >
                        {/* Header */}
                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                p-5
                                rounded-t
                                relative
                                border-b-[1px]
                            "
                        >
                            <button
                                onClick={handleClose}
                                className="
                                    absolute
                                    p-1
                                    left-9
                                    border-0
                                    hover:opacity-70
                                    transition
                                "
                            >
                                <IoMdClose />
                            </button>
                            <div className="text-lg font-semibold">{title}</div>
                        </div>
                        <div
                            className={`
                                h-full
                                md:h-[90vh]
                                lg:h-[90vh] 
                                ${
                                    isScroll
                                        ? "overflow-y-auto"
                                        : "overflow-y-hidden"
                                }
                        `}
                        >
                            {/* Body */}
                            <div className="relative py-0 px-6 flex-auto">
                                {body}
                            </div>
                            {/* Footer */}
                            <div className="flex flex-col gap-1 p-6">
                                <div
                                    className="
                                flex
                                flex-row
                                items-center
                                gap-2
                                w-full
                            "
                                >
                                    {secondaryAction &&
                                        secondaryActionLabel && (
                                            <Button
                                                disabled={disabled}
                                                outline
                                                label={secondaryActionLabel}
                                                onClick={handleSecondaryAction}
                                            />
                                        )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
