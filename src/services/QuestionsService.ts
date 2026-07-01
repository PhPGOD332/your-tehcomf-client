import { IQuestionCategory } from '@/types/IQuestionCategory';
import {
	DIRECTUS_PUBLISHED_STATUS,
	directusApi,
	DirectusListResponse,
} from '@/http/directus';

export default class QuestionsService {
	static async getQuestionsByCategories(): Promise<IQuestionCategory[]> {
		const params = new URLSearchParams({
			fields:
				'id,category,questions.id,questions.question,questions.questionDescription,questions.category',
			sort: 'sort,id',
			'filter[status][_eq]': DIRECTUS_PUBLISHED_STATUS,
			'deep[questions][_sort]': 'sort,id',
			'deep[questions][_filter][status][_eq]': DIRECTUS_PUBLISHED_STATUS,
		});

		const response = await directusApi.get<
			DirectusListResponse<IQuestionCategory>
		>(`/items/question_categories?${params.toString()}`);

		return response.data.data;
	}
}
