"use client";
import { useRouter } from "next/navigation";
import { EmptyStateProps } from "@/commons/typescripts";
import Heading from "@components/heading";
import Button from "@components/button";

const EmptyState: React.FC<EmptyStateProps> = ({
    showReset,
    subtitle = "Try changing or removing some of your filters",
    title = "No exact matches",
}) => {
    const router = useRouter();
    return (
        <div
            className="
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center
        "
        >
            <Heading title={title} subTitle={subtitle} center />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        outline
                        label="Remove all filters"
                        onClick={() => router.push("/")}
                    />
                )}
            </div>
        </div>
    );
};

export default EmptyState;
