import {IWork} from "@/types/IWork";
import $api from "@/http";

export class PortfolioService {
    static async getAllWorks(): Promise<IWork[]> {
        const response = await $api.get('/portfolio').catch(error => error);
        return response.data;
    }

    static async getWork(name: string): Promise<IWork> {
        const response = await $api.post(`/portfolio/work`, { name: name }).catch(error => error);
        return response.data;
    }

    static mutateWorkImagePaths = (work: IWork): IWork => {
        if (work.name && work.mainImage) {
            work.mainImage.image = `${process.env.NEXT_PUBLIC_API_URL}/images/${work.mainImage.image}`;

            // if (work.images && work.images.length > 0) {
            //     work.images.map(image => {
            //         return `${process.env.NEXT_PUBLIC_API_URL}/images/portfolio/${work.name}/${image}`;
            //     })
            // }
        }

        return work;
    }

    static mutateWorksImagesPaths = (works: IWork[]): IWork[] => {
        return works ?
            works.map((work) => {
                if (work.name && work.mainImage) {
                    work.mainImage.image = `${process.env.NEXT_PUBLIC_API_URL}/images/${work.mainImage.image}`;

                    // if (work.images && work.images.length > 0) {
                    //     work.images.map(image => {
                    //         return `${process.env.NEXT_PUBLIC_API_URL}/images/portfolio/${work.name}/${image}`;
                    //     })
                    // }
                }

                return work;
            })
        : [];
    }
}