"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { eachDayOfInterval } from "date-fns";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import useLoginModal from "@/app/hooks/useLoginModal";
import { categories } from "@components/navbar/categories/Categories";
import Container from "@components/container";
import ListingHead from "@/components/listings/listingHead";
import ListingInfo from "@/components/listings/listingInfo";
import ListingReservation from "@components/listings/listingReservation";
import { Range } from "react-date-range";
import { ListingClientProps } from "@/commons/typescripts";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
};

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    reservations = [],
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = () => {
        let dates: Date[] = [];
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });
            dates = [...dates, ...range];
        });
        return dates;
    };
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const onCreateReservation = () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios
            .post("/api/reservations", {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId: listing?.id,
            })
            .then(() => {
                toast.success("Listing reserved!");
                setDateRange(initialDateRange);
                router.push("/trips");
            })
            .catch(() => {
                toast.error("Something went wrong!");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (dateRange.endDate && dateRange.startDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );
            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const category = categories.find((item) => item.label === listing.category);
    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div
                    className="
                    grid
                    grid-cols-1
                    md:grid-cols-7
                    md:gap-10
                    mt-6    
                "
                >
                    <ListingInfo
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={parseInt(listing.roomCount)}
                        bathroomCount={parseInt(listing.bathroomCount)}
                        locationValue={listing.locationValue}
                        guestCount={parseInt(listing.guestCount)}
                    />
                    <div
                        className="
                        order-fisrt
                        mb-10
                        md:order-last
                        md:col-span-3
                    "
                    >
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates()}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;
