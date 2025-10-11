import {IQuestionCategory} from "@/types/IQuestionCategory";

export interface IQuestion {
    id: number;
    question: string;
    questionDescription: string;
    category?: IQuestionCategory;
}