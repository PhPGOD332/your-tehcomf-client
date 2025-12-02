import $api from "@/http";
import {IStyle} from "@/types/IStyle";

export class FilterStylesService {
    static async getFilterStyles(): Promise<IStyle[]> {
        const response = await $api.get('/filter-styles').catch(error => error);
        return response.data;
    }
}