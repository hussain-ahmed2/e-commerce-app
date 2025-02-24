"use client";

import { useEffect, useState } from "react";

export default function useLocalstorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(initialValue);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		const item = localStorage.getItem(key);
		if (item) {
			setStoredValue(JSON.parse(item));
		}
	}, [key]);

	useEffect(() => {
		if (isMounted) {
			localStorage.setItem(key, JSON.stringify(storedValue));
		}
	}, [key, storedValue, isMounted]);

	return [storedValue, setStoredValue] as const;
}
