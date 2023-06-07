import axios from "axios";
import { useRouter } from "next/navigation";
import useLoginModal from "@app/hooks/useLoginModal";
import { IUseFavorite } from "@/commons/typescripts";
import { toast } from "react-hot-toast";

const useFavorites = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = () => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    };

    const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            if (hasFavorited()) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success("Successed!");
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };
    return {
        hasFavorited,
        toggleFavorite,
    };
};

export default useFavorites;
