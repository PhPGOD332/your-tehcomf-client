import {IColor} from "@/types/IColor";
import {IFilterType} from "@/types/PortfolioFilters/IFilterType";
import {IImage} from "@/types/IImage";
import {IFilterLayout} from "@/types/PortfolioFilters/IFilterLayout";
import {IFilterStyle} from "@/types/PortfolioFilters/IFilterStyle";
import {IFilterColor} from "@/types/PortfolioFilters/IFilterColor";

export interface IWork {
    id: number;
    name: string;
    title: string;
    subtitle: string;
    // mainImage: IImage;
    images: IImage[];
    // colors: IColor[];
    style: IFilterStyle;
    layout: IFilterLayout;
    type: IFilterType;
    color: IFilterColor;
    sizesRoom: string;
    sizesFurniture: string;
    housingMaterial: string;
    facadeMaterial: string;
    facadeCoating: string;
    tableTopMaterial: string;
    furnitureMechanisms: string;
    bodyColor: IColor;
    facadeColor: IColor;
    facadeColors: IColor[];
    tableTopColor: IColor;
    furnitureAccessories: string;
    price: number;
    description: string;
}