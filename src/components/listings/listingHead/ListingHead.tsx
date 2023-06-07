"use client";
import useCountries from "@/app/hooks/useCountries";
import { ListingHeadProps } from "@/commons/typescripts";
import Heading from "@/components/heading/Heading";
import HeartButton from "@/components/heartButton";
import Image from "next/image";

const ListingHead: React.FC<ListingHeadProps> = ({
    id,
    imageSrc,
    locationValue,
    title,
    currentUser,
}) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue);

    return (
        <>
            <Heading
                title={title}
                subTitle={`${location?.region}, ${location?.label}`}
            />

            <div
                className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative    
            "
            >
                <Image
                    alt="Image"
                    src={imageSrc}
                    className="object-cover w-full"
                    fill
                />
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    );
};

export default ListingHead;
