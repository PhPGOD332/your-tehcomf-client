import {IQuestion} from "@/types/IQuestion";

export interface IQuestionCategory {
    id: number;
    category: string;
    questions: IQuestion[];
}
