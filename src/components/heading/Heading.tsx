"use client";
import { HeadingProps } from "@/commons/typescripts";

const Heading: React.FC<HeadingProps> = ({ center, title, subTitle }) => {
    return (
        <div className={center ? "text-center" : "text-start"}>
            <div className="text-2xl font-bold">{title}</div>
            <div className="font-light text-neutral-500 mt-2">{subTitle}</div>
        </div>
    );
};

export default Heading;
