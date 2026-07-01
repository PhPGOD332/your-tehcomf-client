import { IColor } from '@/types/IColor';
import {
	DIRECTUS_PUBLISHED_STATUS,
	directusApi,
	DirectusListResponse,
} from '@/http/directus';

type DirectusColor = Omit<IColor, 'captionCode'> & {
	sort?: number | null;
};

export class ColorsService {
	static async getColors(): Promise<IColor[]> {
		const response = await directusApi.get<DirectusListResponse<DirectusColor>>(
			'/items/colors',
			{
				params: {
					sort: 'sort,id',
					'filter[status][_eq]': DIRECTUS_PUBLISHED_STATUS,
				},
			},
		);

		return response.data.data.map((color) => ({
			...color,
			captionCode: '',
		}));
	}
}
