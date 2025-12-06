import {IColor} from "@/types/IColor";
import {IFilterType} from "@/types/PortfolioFilters/IFilterType";
import {IImage} from "@/types/IImage";
import {IFilterLayout} from "@/types/PortfolioFilters/IFilterLayout";

export interface IWork {
    id: number;
    name: string;
    title: string;
    mainImage: IImage;
    // images: string[];
    // colors: IColor[];
    style: string;
    layout: IFilterLayout;
    type: IFilterType;
    sizesRoom: string;
    sizesFurniture: string;
    housingMaterial: string;
    facadeMaterial: string;
    tableTopMaterial: string;
    bodyColor: IColor;
    facadeColors: IColor[];
    tableTopColor: IColor;
    furnitureAccessories: string;
    price: number;
}