import {Metadata} from "next";
import {pagesData} from "@/shared/constants";
import styles from '@/app/styles/pages/main.module.scss';
import SliderScreen, {PhotoSliderSlides} from "@/widgets/SliderScreen/SliderScreen";
import Advantages from "@/widgets/Advantages/Advantages";
import CatalogNav from "@/widgets/CatalogNav/CatalogNav";
import PhraseOrder from "@/widgets/PhraseOrder/PhraseOrder";
import ProjectSequence from "@/widgets/ProjectSequence/ProjectSequence";
import ReviewsInfo from "@/widgets/ReviewsInfo/ReviewsInfo";
import OrderForms from "@/widgets/OrderForms/OrderForms";
import ExamplesSlider from "@/widgets/ExamplesSlider/ExamplesSlider";
import Questions from "@/widgets/Questions/Questions";
import {IQuestion} from "@/types/IQuestion";
import {IQuestionCategory} from "@/types/IQuestionCategory";
import Footer from "@/widgets/Footer/Footer";

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
];

const examplesSlides: PhotoSliderSlides = [
    {
        photo: '/sliders/examples/yellow.jpg',
        photoAlt: 'Желтая',
        title: 'Белая детская с деревом',
        text: 'Кухня для молодой семьи. Главная задача проекта: спроектировать кухню так, чтобы еще осталось место для гостиной и игровой комнаты Самоеда Норда.'
    },
    {
        photo: '/sliders/examples/turquoise.jpg',
        photoAlt: 'Бирюзовая',
        title: 'Шкаф с подвесной тумбой',
        text: 'Кухня для молодой семьи. Главная задача проекта: спроектировать кухню так, чтобы еще осталось место для гостиной и игровой комнаты Самоеда Норда.'
    },
    {
        photo: '/sliders/examples/black.jpg',
        photoAlt: 'Бежевая кухня',
        title: 'Бежевая кухня. Еггер',
        text: 'Кухня для молодой семьи. Главная задача проекта: спроектировать кухню так, чтобы еще осталось место для гостиной и игровой комнаты Самоеда Норда.'
    },
    {
        photo: '/sliders/examples/blue.jpg',
        photoAlt: 'Синяя',
        title: 'Шкаф в спальню',
        text: 'Кухня для молодой семьи. Главная задача проекта: спроектировать кухню так, чтобы еще осталось место для гостиной и игровой комнаты Самоеда Норда.'
    },
    {
        photo: '/sliders/examples/green.jpg',
        photoAlt: 'Зеленая',
        title: 'Серая гостиная с рабочим местом',
        text: 'Кухня для молодой семьи. Главная задача проекта: спроектировать кухню так, чтобы еще осталось место для гостиной и игровой комнаты Самоеда Норда.'
    },
];

const categories: IQuestionCategory[] = [
    {
        id: 1,
        name: 'Категория 1'
    },
    {
        id: 2,
        name: 'Категория 2'
    },
    {
        id: 3,
        name: 'Категория 3'
    }
]

const questions: IQuestion[] = [
    {
        id: 1,
        question: 'Вопрос 1',
        answer: 'Ответ 1',
        categoryId: 1
    },
    {
        id: 2,
        question: 'Вопрос 1',
        answer: 'Ответ 1',
        categoryId: 2
    },
    {
        id: 3,
        question: 'Вопрос 1',
        answer: 'Ответ 1',
        categoryId: 3
    },
    {
        id: 4,
        question: 'Вопрос 2',
        answer: 'Ответ 2',
        categoryId: 2
    }
];

export default function Home() {

  return (
    <>
      <main className={styles.main}>
        <SliderScreen slides={startScreenSlides} />
        <Advantages />
        <CatalogNav title='Мебель под любой запрос'/>
        <PhraseOrder />
        <ProjectSequence />
        <ExamplesSlider
            slides={examplesSlides}
            title='Примеры наших работ'
        />
        <ReviewsInfo />
        <OrderForms />
        <Questions
            questions={questions}
            questionsCategories={categories}
        />
        <Footer isContact={true}/>
      </main>
    </>
  );
}
