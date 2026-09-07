'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import {
	buildYandexMetrikaUrl,
	type YandexMetrikaLanding,
} from '@/shared/utils/yandexMetrika';

type YandexMetrikaFunction = (...args: unknown[]) => void;

declare global {
	interface Window {
		__tehcomfMetrikaLanding?: YandexMetrikaLanding;
		ym?: YandexMetrikaFunction;
	}
}

interface YandexMetrikaRouteTrackerProps {
	counterId: string;
}

const YandexMetrikaRouteTracker = ({
	counterId,
}: YandexMetrikaRouteTrackerProps) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const query = searchParams.toString();
	const previousUrl = useRef<string | null>(null);

	useEffect(() => {
		const currentUrl = buildYandexMetrikaUrl(
			window.location.origin,
			pathname || '/',
			query,
		);

		if (previousUrl.current === null) {
			previousUrl.current = window.__tehcomfMetrikaLanding?.url || currentUrl;
			return;
		}

		if (previousUrl.current === currentUrl) {
			return;
		}

		window.ym?.(Number(counterId), 'hit', currentUrl, {
			referer: previousUrl.current,
			title: document.title,
		});
		previousUrl.current = currentUrl;
	}, [counterId, pathname, query]);

	return null;
};

export default YandexMetrikaRouteTracker;
