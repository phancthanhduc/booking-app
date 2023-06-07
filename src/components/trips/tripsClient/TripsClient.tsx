"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { TripsClientProps } from "@/commons/typescripts";
import Container from "@/components/container/Container";
import Heading from "@/components/heading/Heading";
import ListingCard from "@/components/listings/listingCard/ListingCard";

const TripsClient: React.FC<TripsClientProps> = ({
    currentUser,
    reservations,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = (id: string) => {
        setDeletingId(id);

        axios
            .delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation cancelled");
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            })
            .finally(() => {
                setDeletingId("");
            });
    };

    return (
        <Container>
            <Heading
                title="Trips"
                subTitle="Where you've been and where you're going"
            />
            <div
                className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            "
            >
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

export default TripsClient;
