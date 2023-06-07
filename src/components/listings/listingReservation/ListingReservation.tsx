"use client";

import { ListingReservationProps } from "@/commons/typescripts";
import Button from "@/components/button/Button";
import Calendar from "@/components/input/calendar/Calendar";

const ListingReservation: React.FC<ListingReservationProps> = ({
    dateRange,
    disabledDates,
    onChangeDate,
    onSubmit,
    price,
    totalPrice,
    disabled,
}) => {
    return (
        <div
            className="
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden
    "
        >
            <div
                className="
            flex flex-row items-center gap-1 p-4
        "
            >
                <div
                    className="
                text-2xl font-semibold
            "
                >
                    $ {price}
                </div>
                <div className="font-ligth text-neutral-600">night.</div>
            </div>
            <hr />
            <Calendar
                onChange={(value) => onChangeDate(value.selection)}
                value={dateRange}
                disabledDates={disabledDates}
            />
            <hr />
            <div className="p-4">
                <Button
                    disabled={disabled}
                    label="Reserve"
                    onClick={onSubmit}
                />
            </div>
            <div
                className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
            "
            >
                <div>Total</div>
                <div>${totalPrice}</div>
            </div>
        </div>
    );
};

export default ListingReservation;
