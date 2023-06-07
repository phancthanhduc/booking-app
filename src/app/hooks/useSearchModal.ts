import { SearchModalStore } from "@/commons/typescripts";
import { create } from "zustand";

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSearchModal;
