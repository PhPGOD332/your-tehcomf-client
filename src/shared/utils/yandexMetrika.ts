export interface YandexMetrikaLanding {
	referer: string;
	url: string;
}

export const isValidYandexMetrikaCounter = (counterId: string): boolean =>
	/^\d{1,20}$/u.test(counterId.trim());

export const resolveYandexMetrikaCounterId = (
	...candidates: unknown[]
): string => {
	for (const candidate of candidates) {
		const counterId =
			typeof candidate === 'number' || typeof candidate === 'string'
				? String(candidate).trim()
				: '';

		if (isValidYandexMetrikaCounter(counterId)) {
			return counterId;
		}
	}

	return '';
};

export const buildYandexMetrikaUrl = (
	origin: string,
	pathname: string,
	search: string | URLSearchParams,
): string => {
	const normalizedPathname = pathname.startsWith('/')
		? pathname
		: `/${pathname}`;
	const url = new URL(normalizedPathname || '/', origin);

	url.search = typeof search === 'string' ? search : search.toString();

	return url.href;
};

export const buildYandexMetrikaBootstrap = (counterId: string): string => {
	const normalizedCounterId = counterId.trim();

	if (!isValidYandexMetrikaCounter(normalizedCounterId)) {
		return '';
	}

	return `(function(){function clean(value){try{var url=new URL(value,window.location.href);url.hash="";return url.href;}catch(error){return window.location.origin+window.location.pathname+window.location.search;}}function cleanReferer(value){if(!value){return "";}try{var referer=new URL(value);referer.hash="";return referer.href;}catch(error){return "";}}var landing=window.__tehcomfMetrikaLanding=window.__tehcomfMetrikaLanding||{url:clean(window.location.href),referer:cleanReferer(document.referrer)};(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${normalizedCounterId},"init",{accurateTrackBounce:true,clickmap:true,defer:true,trackLinks:true,webvisor:true});var hitOptions={title:document.title};if(landing.referer){hitOptions.referer=landing.referer;}ym(${normalizedCounterId},"hit",landing.url,hitOptions);}());`;
};
