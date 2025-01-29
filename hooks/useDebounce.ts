import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value); // State
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay); // Update the debounced value
        return () => clearTimeout(handler); // Clear the timeout
    }, [value, delay]);
    return debouncedValue;
}