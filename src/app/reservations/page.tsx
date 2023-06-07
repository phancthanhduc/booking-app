import getCurrentUser from "@app/actions/getCurrentUser";
import getReservations from "@app/actions/getReservations";
import EmptyState from "@/components/emptyState";
import ReservationsClient from "@/components/reservations/reservationsClient";
import { SafeUser } from "@/commons/typescripts";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please Login" />;
    }

    const reservations = await getReservations({
        authorId: currentUser.id,
    });

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="No reservations found"
                subtitle="Looks like you have no reservations on your properties"
            />
        );
    }

    return (
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser as SafeUser}
        />
    );
};

export default ReservationsPage;
