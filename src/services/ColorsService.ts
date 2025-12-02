import {IColor} from "@/types/IColor";
import $api from "@/http";

export class ColorsService {
    static async getColors(): Promise<IColor[]> {
        const response = await $api.get('/colors').catch(error => error);
        return response.data;
    }
}