"use client";

import { useEffect } from "react";
import { ErrorStateProps } from "@/commons/typescripts";
import EmptyState from "@/components/emptyState/EmptyState";

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
    useEffect(() => {
        console.log(error);
    }, [error]);

    return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorState;
