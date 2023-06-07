import getCurrentUser from "@app/actions/getCurrentUser";
import getListingById from "@app/actions/getListingById";
import getReservations from "@app/actions/getReservations";
import { IParams, SafeUser } from "@/commons/typescripts";
import EmptyState from "@components/emptyState/EmptyState";
import ListingClient from "@components/listings/listingClient";

const ListingPage = async ({ params }: { params: IParams }) => {
    if (params.listingId === "%5Bobject%20Object%5D") {
        return null;
    }
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(params);

    if (!listing) {
        return <EmptyState />;
    }

    return (
        <ListingClient
            listing={listing}
            currentUser={currentUser as SafeUser}
            reservations={reservations}
        />
    );
};

export default ListingPage;
