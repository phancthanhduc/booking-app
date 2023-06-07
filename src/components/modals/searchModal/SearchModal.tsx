"use client";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import qs from "query-string";
import useSearchModal from "@/app/hooks/useSearchModal";
import { CountrySelectValue } from "@/commons/typescripts";
import { CountrySelect } from "@/components/input";
import Modal from "@components/modals/modal";
import Heading from "@/components/heading/Heading";
import Calendar from "@/components/input/calendar/Calendar";
import Counter from "@/components/input/counter/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });
    const Map = useMemo(
        () => dynamic(() => import("@components/map/Map"), { ssr: false }),
        [location]
    );

    const onBack = () => {
        setStep(step - 1);
    };

    const onNext = () => {
        setStep(step + 1);
    };

    const onSubmit = async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    };

    const actionLabel = () => {
        if (step === STEPS.INFO) {
            return "Search";
        }
        return "Next";
    };

    const secondaryActionLabel = () => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        return "Back";
    };

    let bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Where do you wanna go?"
                subTitle="Find the perfect location"
            />
            <hr />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <Map center={location?.latlng} />
        </div>
    );

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-9">
                <Heading
                    title="When do you plan to go?"
                    subTitle="Make sure everyone is free!"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-10 mb-[72px]">
                <Heading
                    title="More information"
                    subTitle="Find your perfect place!"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel()}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={secondaryActionLabel()}
            body={bodyContent}
            isScroll
        />
    );
};

export default SearchModal;
