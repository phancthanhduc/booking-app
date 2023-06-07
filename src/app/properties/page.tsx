import getListings from "@app/actions/getListings";
import getCurrentUser from "@app/actions/getCurrentUser";
import { SafeUser } from "@/commons/typescripts";
import EmptyState from "@/components/emptyState/EmptyState";
import PropertiesCLient from "@components/properties/propertiesClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login" />;
    }

    const listings = await getListings({ userId: currentUser.id });

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like you haven't no properties."
            />
        );
    }

    return (
        <PropertiesCLient
            listings={listings}
            currentUser={currentUser as SafeUser}
        />
    );
};

export default PropertiesPage;
