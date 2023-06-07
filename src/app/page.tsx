import getListings from "@app/actions/getListings";
import getCurrentUser from "@app/actions/getCurrentUser";
import Container from "@/components/container";
import EmptyState from "@/components/emptyState";
import ListingCard from "@/components/listings/listingCard";
import { HomeProps, SafeListing, SafeUser } from "@/commons/typescripts";
import ClientOnly from "@/components/ClientOnly/ClientOnly";

export const dynamic = "force-dynamic";

const Home = async ({ searchParams }: HomeProps) => {
    const listings = await getListings(searchParams);
    const currentUser = await getCurrentUser();
    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState showReset />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <Container>
                <div
                    className="
                pt-24
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
                    {listings.map((listing: SafeListing) => {
                        return (
                            <ListingCard
                                key={listing.id}
                                currentUser={currentUser as SafeUser}
                                data={listing}
                            />
                        );
                    })}
                </div>
            </Container>
        </ClientOnly>
    );
};

export default Home;
