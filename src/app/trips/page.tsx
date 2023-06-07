import getCurrentUser from "@app/actions/getCurrentUser";
import getReservations from "@app/actions/getReservations";
import { SafeUser } from "@/commons/typescripts";
import EmptyState from "@/components/emptyState";
import TripsClient from "@components/trips/tripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login" />;
    }

    const reservations = await getReservations({ userId: currentUser.id });

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No trip found"
                subtitle="Looks like you haven't reserved any trips."
            />
        );
    }

    return (
        <TripsClient
            reservations={reservations}
            currentUser={currentUser as SafeUser}
        />
    );
};

export default TripsPage;
