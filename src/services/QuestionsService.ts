import {IQuestionCategory} from "@/types/IQuestionCategory";
import $api from "@/http";
import {AxiosResponse} from "axios";

export default class QuestionsService {
    static async getQuestionsByCategories(): Promise<IQuestionCategory[]> {
        const response: AxiosResponse<IQuestionCategory[]> = await $api.get('/questions/categoriesWithQuestions');
        return response.data;
    }
}