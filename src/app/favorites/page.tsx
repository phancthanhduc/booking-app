import getCurrentUser from "@app/actions/getCurrentUser";
import getFavoriteListings from "@app/actions/getFavoriteListings";
import EmptyState from "@components/emptyState";
import FavoritesClient from "@components/favorites/favoritesClient";
import { SafeListing, SafeUser } from "@/commons/typescripts";

const FavoritesPage = async () => {
    const favoriteListings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (favoriteListings.length === 0) {
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorite listings"
            />
        );
    }

    return (
        <FavoritesClient
            favoriteListings={favoriteListings as SafeListing[]}
            currentUser={currentUser as SafeUser}
        />
    );
};

export default FavoritesPage;
