"use client";
import { CounterProps } from "@/commons/typescripts";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Counter: React.FC<CounterProps> = ({
    onChange,
    subtitle,
    title,
    value,
}) => {
    const onAdd = () => {
        onChange(value + 1);
    };

    const onReduce = () => {
        onChange(value - 1);
    };
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">{title}</div>
                <div className="font-ligth text-neutral-600">{subtitle}</div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div
                    onClick={onReduce}
                    className="
                        w-10
                        h-10
                        rounded-full
                        border-[1px]
                        border-neutral-400
                        flex
                        items-center
                        justify-center
                        text-neutral-600
                        cursor-pointer
                        hover:opacity-80
                        transition
                    "
                >
                    <AiOutlineMinus />
                </div>
                <div className="font-ligth text-xl text-neutral-600">
                    {value}
                </div>
                <div
                    onClick={onAdd}
                    className="
                        w-10
                        h-10
                        rounded-full
                        border-[1px]
                        border-neutral-400
                        flex
                        items-center
                        justify-center
                        text-neutral-600
                        cursor-pointer
                        hover:opacity-80
                        transition
                    "
                >
                    <AiOutlinePlus />
                </div>
            </div>
        </div>
    );
};

export default Counter;
