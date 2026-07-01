import { IClaim } from '@/types/IClaim';
import { ClaimDto } from '@/types/dtos/Claim.dto';
import { directusApi, DirectusItemResponse } from '@/http/directus';

export default class ClaimService {
	static async addClaim(body: ClaimDto): Promise<IClaim> {
		const response = await directusApi.post<DirectusItemResponse<IClaim>>(
			'/items/claims',
			{
				firstName: body.firstName,
				mobilePhone: body.mobilePhone,
				note: body.note,
				date: body.date,
				claimType: body.claimType,
				company: body.company,
			},
		);

		return response.data.data;
	}
}
