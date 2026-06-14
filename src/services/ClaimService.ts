import { AxiosResponse } from 'axios';
import { IClaim } from '@/types/IClaim';
import $api from '@/http';
import { ClaimDto } from '@/types/dtos/Claim.dto';

export default class ClaimService {
	static async addClaim(body: ClaimDto): Promise<AxiosResponse<IClaim>> {
		return await $api.post<IClaim>(`/claims/addClaim`, body);
	}
}
