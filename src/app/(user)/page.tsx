import {Metadata} from "next";
import {pagesData} from "@/shared/constants";
import SliderScreen, {PhotoSliderSlides} from "@/widgets/SliderScreen/SliderScreen";
import Advantages from "@/widgets/Advantages/Advantages";
import CatalogNav from "@/widgets/CatalogNav/CatalogNav";

export const metadata: Metadata = {
  metadataBase: new URL(pagesData.main.url),
  title: pagesData.main.title,
  description: pagesData.main.description,
  keywords: pagesData.main.keywords,
}

const startScreenSlides: PhotoSliderSlides = [
    {
        photo: '/sliders/main/start-slider-1.png',
        photoAlt: 'Кухня',
        title: 'Мебель на заказ в Москве',
        text: 'Кухни и корпусная мебель по вашим размерам в Москве и Московской области под ключ за 20 дней'
    },
    {
        photo: '/sliders/main/start-slider-2.png',
        photoAlt: 'Кухня',
        title: 'Шкафы, прихожие и гардеробные',
        text: 'Изготовим мебель по вашему проекту из качественных материалов по приемлемым ценам'
    },
    {
        photo: '/sliders/main/start-slider-3.png',
        photoAlt: 'Кухня',
        title: 'Комплексная меблировка под ключ',
        text: 'Полный спектр услуг по изготовлению мебели с гарантией: от прихожей до ванной комнаты'
    },
    {
        photo: '/sliders/main/start-slider-4.png',
        photoAlt: 'Кухня',
        title: 'Офисная мебель на заказ в Москве',
        text: 'Шкафы, стеллажи, столы, тумбы — все для эргономичного обустройства офисного пространства'
    },
    {
        photo: '/sliders/main/start-slider-5.png',
        photoAlt: 'Кухня',
        title: 'Мебель в любую комнату в вашем дизайне',
        text: 'Мебель для всей квартиры по индивидуальному проекту от производителя'
    },
]

export default function Home() {
  return (
    <>
      <main>
        <SliderScreen slides={startScreenSlides} />
        <Advantages />
        <CatalogNav title='Мебель под любой запрос'/>
      </main>
    </>
  );
}
