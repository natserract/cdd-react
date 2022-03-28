import { useEffect } from "react";
import { setItem } from "src/utils/storage";

export const usePersistForm = ({
    value,
    localStorageKey,
}) => {
    useEffect(() => {
        setItem(localStorageKey, value);
    }, [localStorageKey, value]);

    return;
};