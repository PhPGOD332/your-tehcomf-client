import {AxiosResponse} from "axios";
import {IClaim} from "@/types/IClaim";
import $api from "@/http";
import {ClaimDto} from "@/types/dtos/Claim.dto";

export default class ClaimService {
    static async getClaims(): Promise<AxiosResponse<IClaim>> {
        return await $api.get<IClaim>(`/claims/getClaims`);
    }

    static async addClaim(body: ClaimDto): Promise<AxiosResponse<IClaim>> {
        console.log(body)
        return await $api.post<IClaim>(`/claims/addClaim`, body);
    }
}