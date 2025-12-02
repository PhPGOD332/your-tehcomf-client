import {IType} from "@/types/IType";
import $api from "@/http";

export class FilterTypesService {
    static async getFilterTypes(): Promise<IType[]> {
        const response = await $api.get('/filter-types').catch(error => error);
        return response.data;
    }
}