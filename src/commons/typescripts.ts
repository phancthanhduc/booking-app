import { Listing, Reservation, User } from "@prisma/client";
import { Range, RangeKeyDict } from "react-date-range";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons/lib";

export interface ContainerProps {
    children: React.ReactNode;
}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
};

export type SafeReservations = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
};

export interface HomeProps {
    searchParams: IListingsParams;
}

export interface NavbarProps {
    currentUser?: SafeUser;
}

export interface UserMenuProps {
    currentUser?: SafeUser;
}

export interface MenuItemProps {
    onClick: () => void;
    label: string;
}

export interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    isScroll?: boolean;
}

export interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

export interface RegisterModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export interface LoginModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export interface SearchModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export interface RentModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export interface HeadingProps {
    title: string;
    center?: boolean;
    subTitle?: string;
}

export interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    regiter: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

export interface AvatarProps {
    src: string;
}

export interface CategoryBoxProps {
    label: string;
    icon: IconType;
    selected?: boolean;
}

export interface CategoryInputProps {
    icon: IconType;
    label: string;
    selected?: boolean;
    onClick: (value: string) => void;
}

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
};

export interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

export interface CalendarProps {
    value: Range;
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[];
}

export interface MapProps {
    center?: number[];
}

export interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

export interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

export interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

export interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservations;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

export interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

export interface ListingClientProps {
    reservations?: SafeReservations[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

export interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

export interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category:
        | {
              icon: IconType;
              label: string;
              description: string;
          }
        | undefined;
    locationValue: string;
}

export interface ListingCategoryProps {
    icon: IconType;
    label: string;
    description: string;
}

export interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

export interface TripsClientProps {
    reservations: SafeReservations[];
    currentUser: SafeUser | null;
}

export interface ReservationsClientProps {
    reservations: SafeReservations[];
    currentUser?: SafeUser | null;
}

export interface FavoritesClientProps {
    favoriteListings?: SafeListing[];
    currentUser?: SafeUser;
}

export interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser: SafeUser | null;
}

export interface NextAuthProviderProps {
    children: React.ReactNode;
}

export interface IParams {
    listingId?: string;
}

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export interface IReservationParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export interface IReservationApiProps {
    reservationId?: string;
}

export interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

export interface ErrorStateProps {
    error: Error;
}
