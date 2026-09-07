import { resolveYandexMetrikaCounterId } from '@/shared/utils/yandexMetrika';

export const YANDEX_METRIKA_ID = resolveYandexMetrikaCounterId(
	process.env.YANDEX_METRIKA_ID,
	process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID,
);
