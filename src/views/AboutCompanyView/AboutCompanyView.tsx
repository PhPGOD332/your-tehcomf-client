'use client'
import React from 'react';
import styles from './AboutCompanyView.module.scss';
import AboutCompany from "@/widgets/AboutCompany/AboutCompany";
import SubTitle from "@/shared/UI/SubTitle/SubTitle";
import TextWithSmoothSlider from "@/widgets/TextWithSmoothSlider/TextWithSmoothSlider";
import { TImage } from "@/types/IImage";
import Footer from "@/widgets/Footer/Footer";
import { IStock } from "@/types/IStock";
import stock1 from "@/data/images/stocks_banners/guy.png";
import stock1Mobile from "@/data/images/stocks_banners/guys_ruler.png";
import stock2 from "@/data/images/stocks_banners/house.png";
import stock3 from "@/data/images/stocks_banners/model.png";
import stock4 from "@/data/images/stocks_banners/builders.png";
import InNumbers from "@/widgets/InNumbers/InNumbers";
import StockBanners from "@/widgets/StockBanners/StockBanners";
import ContactsForm from "@/widgets/Footer/ContactsForm/ContactsForm";
import {
    fifthBrands,
    fourthBrands,
    secondBrands, sixthBrands,
    sliderItems1,
    sliderItems2,
    sliderItems3,
    sliderItems4, sliderItems5, sliderItems6,
    thirdBrands
} from "@/views/AboutCompanyView/images";

const stockImage1: TImage = stock1;
const stockImageMobile1: TImage = stock1Mobile;
const stockImage2: TImage = stock2;
const stockImage3: TImage = stock3;
const stockImage4: TImage = stock4;

const AboutCompanyView = () => {

    const discussProjectHandler = () => {

    }

    const stocks: IStock[] = [
        {
            caption: 'Обсуждение проекта <br>и замеры помещения',
            mobileCaption: 'Обсуждение <br>и замеры помещения',
            buttonText: 'Подробнее',
            color: 'green',
            image: stockImage1,
            imageWidth: 256,
            imageHeight: 256,
            mobileImage: stockImageMobile1,
            mobileImageWidth: 216,
            mobileImageHeight: 216,
            clickAction: () => discussProjectHandler(),
            mobileImageStyles: {right: '0'}
        },
        {
            caption: 'Создание и утверждение <br>3Д-проекта',
            mobileCaption: 'Создание <br>и утверждение <br>3Д-проекта',
            buttonText: 'Подробнее',
            color: 'blue',
            image: stockImage2,
            imageWidth: 180,
            imageHeight: 180,
            mobileImage: stockImage2,
            mobileImageWidth: 224,
            mobileImageHeight: 224,
            clickAction: () => discussProjectHandler(),
            mobileImageStyles: {right: '0'}
        },
        {
            caption: 'Доставка <br>произведенной мебели',
            mobileCaption: 'Доставка <br>произведенной <br>мебели',
            buttonText: 'Подробнее',
            color: 'pink',
            image: stockImage3,
            imageWidth: 180,
            imageHeight: 180,
            mobileImage: stockImage3,
            mobileImageWidth: 203,
            mobileImageHeight: 203,
            clickAction: () => discussProjectHandler(),
            mobileImageStyles: {right: '0'}
        },
        {
            caption: 'Cборка мебели <br>нашей бригадой',
            buttonText: 'Подробнее',
            color: 'peach',
            image: stockImage4,
            imageWidth: 180,
            imageHeight: 180,
            mobileImage: stockImage4,
            mobileImageWidth: 224,
            mobileImageHeight: 224,
            clickAction: () => discussProjectHandler(),
            mobileImageStyles: {right: '0'}
        }
    ];

    return (
        <>
            <div className={styles.main}>
                <AboutCompany titleAs="h1"/>
                <div className={styles.slidersBlock}>
                    <SubTitle classNames={styles.title}>Производство и материалы</SubTitle>
                    <TextWithSmoothSlider
                        title={'Где производим?'}
                        text={
                            <span>Мы производим и поставляем кухни и мебель на заказ на собственном производстве в Московской области, в розницу для физических лиц и оптом для магазинов и торговых сетей. <br/><br/>
                        <b>Адрес:</b> г. Зеленоград, Московская область</span>}
                        sliderItems={sliderItems1}
                        sliderOrientation={'right'}
                        isMap={true}
                    />
                    <TextWithSmoothSlider
                        title={'На чем производим?'}
                        text={
                            <span>Наша фабрика оснащена высокоточным оборудованием от
                            ведущих европейских производителей: немецкие обрабатывающие
                            центры <b>Homag</b> (включая 5-осевой станок BAZ 5 axis для
                            гнутых фасадов), мембранно-вакуумный пресс <b>Bürkle</b> для
                            безупречной облицовки ПВХ-пленкой, сверлильно-присадочные
                            центры <b>Weeke</b>, а также форматно-раскроечные станки <b>Holzma</b> и
                            кромкооблицовочные линии <b>IMA</b>. Это позволяет
                            гарантировать точность до 0,1 мм, высокую скорость обработки
                            и безупречное качество каждой детали.</span>}
                        sliderItems={sliderItems2}
                        sliderOrientation={'left'}
                        brands={secondBrands}
                        brandsDirection={'right'}
                    />
                    <TextWithSmoothSlider
                        title={'Из чего изготавливаем корпус?'}
                        text={
                            <span>Мы используем высокопрочные <b>ДСП</b> от ведущих австрийских
                            производителей — <b>Egger</b> и <b>Kronospan</b> для изготовления своих
                            каркасов мебели. <br/><br/>
                            Эти ДСП соответствуют ГОСТам и самым строгим европейским
                            стандартам экологической и санитарной безопасности, что
                            подтверждено соответствующими сертификатами. <br/><br/>
                            Это гарантирует безопасность использования нашей мебели
                            для человека и домашних животных.</span>}
                        sliderItems={sliderItems3}
                        sliderOrientation={'right'}
                        brands={thirdBrands}
                        brandsDirection={'left'}
                    />
                    <TextWithSmoothSlider
                        title={'Из чего изготавливаем фасад?'}
                        text={
                            <span>Мы используем <b>ДСП</b> от европейских производителей,
                            таких как <b>Egger</b> и <b>Kronospan</b>. Кроме того,
                            мы работаем с <b>МДФ</b>, которую нам поставляет австрийская
                            компания Egger. Также мы используем массив и шпон
                            натурального дерева от итальянских партнеров. <br/><br/>
                            Различные виды отделочных материалов, такие как шпон,
                            ламинат, HPL- пластик, меламин, акрил, термопластик и
                            эмаль не только защищают фасады от внешних воздействий,
                            но и являются важным элементом дизайна наших моделей.</span>}
                        sliderItems={sliderItems4}
                        sliderOrientation={'left'}
                        brands={fourthBrands}
                        brandsDirection={'right'}
                    />
                    <TextWithSmoothSlider
                        title={'Из чего изготавливаем столешницы?'}
                        text={
                            <span><b>Искусственный камень</b> — это современный материал,
                            сочетающий в себе преимущества натурального камня -
                            прочность, долговечность и красоту, и при этом лишен
                            его недостатков. Для производства столешниц мы используем
                            материалы от компании Hanex (Южная Корея). Также мы
                            изготавливаем интегрированные мойки из искусственного
                            материала. <br/><br/>
                            Используем только высококачественные, красивые и
                            износостойкие плиты <b>ДСП</b> и <b>ЛДСП</b>, покрытые
                            пластиком, от надежных поставщиков — Arpa, Lamicolor,
                            Cleaf (Италия), Formica (Финляндия) и Resopal (Германия).</span>}
                        sliderItems={sliderItems5}
                        sliderOrientation={'right'}
                        brands={fifthBrands}
                        brandsDirection={'left'}
                    />
                    <TextWithSmoothSlider
                        title={'Какое наполнение у кухонь?'}
                        text={
                            <span>Мы работаем с ведущими производителями бытовой техники
                            и электроники, такими как <b>Gorenje</b>, <b>Krona</b>, <b>Liebherr</b>, <b>Hotpoint</b>, <b>Elica</b>, <b>Elikor</b>, <b>Faber</b>, <b>Candy</b>, <b>Beko</b>, <b>Maunfeld</b>, <b>Zigmund & Shtain</b>, <b>Haier</b>, <b>Kuppersbusch</b>, <b>Graude</b>, <b>SMEG</b>, <b>Asko</b> и <b>Korting</b>. <br/><br/>
                            Мы оснащаем свою мебель современными и практичными
                            механизмами и фурнитурой от ведущих производителей,
                            таких фирм как <b>Hettich</b> (Германия), <b>Blum</b> (Австрия)
                            под заказ. <br/><br/>
                            Это позволяет значительно упростить эксплуатацию наших
                            кухонь и корпусной мебели, а также продлить срок
                            их службы.</span>}
                        sliderItems={sliderItems6}
                        sliderOrientation={'left'}
                        brands={sixthBrands}
                        brandsDirection={'right'}
                    />
                </div>
                <ContactsForm
                    isOnlyForm={{desktop: false, mobile: true}}
                    classNames={styles.contactForm_radius}
                />
                <StockBanners stocks={stocks} title={'Этапы работы'} />
                <InNumbers />
            </div>
            <Footer
                isContact={true}
                isContactOnlyContacts={{desktop: false, mobile: true}}
            />
        </>
    );
};

export default AboutCompanyView;
