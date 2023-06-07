"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { PropertiesClientProps } from "@/commons/typescripts";
import Container from "@components/container";
import Heading from "@components/heading";
import ListingCard from "@components/listings/listingCard";

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    currentUser,
    listings,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = (id: string) => {
        setDeletingId(id);

        axios
            .delete(`/api/listings/${id}`)
            .then(() => {
                toast.success("Listing deleted");
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
            <Heading title="Properties" subTitle="List of your properties" />
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
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel="Delete property"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

export default PropertiesClient;
