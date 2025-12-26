import {IWork} from "@/types/IWork";
import $api from "@/http";
import {TNameCategory} from "@/types/IFilters";

export class PortfolioService {
    static async getAllWorks(): Promise<IWork[]> {
        const response = await $api.get('/portfolio').catch(error => error);
        return response.data;
    }

    static async getWorksByFilter(filterName: TNameCategory, filterValue: string, currWorkName: string): Promise<IWork[]> {
        const response = await $api.get(`/portfolio?filter-name=${filterName}&filter-value=${filterValue}`).catch(error => error);
        const works: IWork[] = response.data;

        return  works.filter(work => work.name !== currWorkName);
    }

    static async getWork(name: string): Promise<IWork> {
        const response = await $api.post(`/portfolio/work`, { name: name }).catch(error => error);
        return response.data;
    }

    static mutateWorkImagePaths = (work: IWork): IWork => {
        if (work.name && work.images && work.images.length > 0) {
            // work.mainImage.src = `${process.env.NEXT_PUBLIC_API_URL}/images/${work.mainImage.src}`;

            // if (work.images && work.images.length > 0) {
                work.images.map(image => {
                    image.src = `${process.env.NEXT_PUBLIC_API_URL}/images/${image.src}`;
                    return image;
                })
            // }
        }

        return work;
    }

    static mutateWorksImagesPaths = (works: IWork[]): IWork[] => {
        return works ?
            works.map((work) => {
                if (work.name && work.images && work.images.length > 0) {
                    // work.mainImage.src = `${process.env.NEXT_PUBLIC_API_URL}/images/${work.mainImage.src}`;

                    // if (work.images && work.images.length > 0) {
                        work.images.map(image => {
                            image.src = `${process.env.NEXT_PUBLIC_API_URL}/images/${image.src}`;
                            return image;
                        })
                    // }
                }

                return work;
            })
        : [];
    }
}