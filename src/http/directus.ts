import axios from 'axios';

export const DIRECTUS_URL = (
	process.env.NEXT_PUBLIC_API_URL || 'https://cms.tehcomf.ru'
).replace(/\/$/, '');

export const DIRECTUS_PUBLISHED_STATUS = 'published';

export interface DirectusListResponse<T> {
	data: T[];
	meta?: {
		filter_count?: number;
		total_count?: number;
	};
}

export interface DirectusItemResponse<T> {
	data: T;
}

const getDirectusBaseUrl = (): string => {
	if (typeof window === 'undefined') {
		return DIRECTUS_URL;
	}

	return '/api/directus';
};

export const directusApi = axios.create({
	baseURL: getDirectusBaseUrl(),
});

export const getDirectusAssetUrl = (fileId?: string | null): string =>
	fileId ? `${DIRECTUS_URL}/assets/${fileId}` : '';
