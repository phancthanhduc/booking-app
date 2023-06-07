"use client";
import useCountries from "@/app/hooks/useCountries";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ListingCardProps } from "@/commons/typescripts";
import Image from "next/image";
import HeartButton from "@components/heartButton";
import Button from "@components/button";

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    actionId = "",
    actionLabel,
    currentUser,
    disabled,
    onAction,
    reservation,
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) {
            return;
        }
        onAction?.(actionId);
    };

    const price = () => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    };

    const reservationDate = () => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, "PP")} - ${format(end, "PP")}`;
    };

    return (
        <div className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
                    aspect-square
                    w-full
                    relative
                    overflow-hidden
                    rounded-xl
                "
                    onClick={() => router.push(`/listings/${data.id}`)}
                >
                    <Image
                        fill
                        alt="Listing"
                        src={data.imageSrc}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-ligth text-neutral-500">
                    {reservationDate() || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">$ {price()}</div>
                    {!reservation && <div className="font-ligth">night</div>}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    );
};

export default ListingCard;
