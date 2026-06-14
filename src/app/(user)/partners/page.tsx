import styles from '@/app/styles/pages/docs.module.scss';
import { Metadata } from 'next';
import { pagesData } from '@/shared/constants';
import Footer from '@/widgets/Footer/Footer';
import LinkScreen from '@/widgets/LinkScreen/LinkScreen';
import Advantages, { type IAdvantageEl } from '@/widgets/Advantages/Advantages';
import PartnersPortfolio, {
	type PartnersPortfolioWork,
} from '@/widgets/PartnersPortfolio/PartnersPortfolio';
import PartnersBenefits, {
	type PartnersBenefit,
} from '@/widgets/PartnersBenefits/PartnersBenefits';
import PartnersHowWeWork from '@/widgets/PartnersHowWeWork/PartnersHowWeWork';
import PartnersOtherWorks from '@/widgets/PartnersOtherWorks/PartnersOtherWorks';
import { PortfolioService } from '@/services/PortfolioService';
import { type IWork } from '@/types/IWork';
import modelImage from '@/data/images/stocks_banners/model.png';
import moneyImage from '@/data/images/stocks_banners/money.png';
import buildersImage from '@/data/images/stocks_banners/builders.png';
import calendarImage from '@/data/images/stocks_banners/calendar.png';

export const metadata: Metadata = {
	metadataBase: new URL(pagesData.partners.url),
	title: pagesData.partners.title,
	description: pagesData.partners.description,
	keywords: pagesData.partners.keywords,
};

const advantages: IAdvantageEl[] = [
	{
		icon: (
			<svg
				width='47'
				height='38'
				viewBox='0 0 47 38'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M-0.000976562 31.1719V14.3555H46.5723V31.1719C46.5723 33.291 46.0596 34.877 45.0342 35.9297C44.0088 36.9961 42.5801 37.5293 40.748 37.5293H6.43848C4.29199 37.5293 2.67871 36.9961 1.59863 35.9297C0.532227 34.877 -0.000976562 33.291 -0.000976562 31.1719ZM-0.000976562 11.6689V6.17285C-0.000976562 4.1084 0.491211 2.56348 1.47559 1.53809C2.45996 0.512695 3.85449 0 5.65918 0H11.5039C12.1738 0 12.7549 0.0478516 13.2471 0.143555C13.7529 0.239258 14.2109 0.396484 14.6211 0.615234C15.0449 0.833984 15.4824 1.13477 15.9336 1.51758L17.1846 2.54297C17.7041 2.98047 18.2031 3.29492 18.6816 3.48633C19.1602 3.66406 19.748 3.75293 20.4453 3.75293H40.1328C42.2656 3.75293 43.8721 4.28613 44.9521 5.35254C46.0322 6.41895 46.5723 8.00488 46.5723 10.1104V11.6689H-0.000976562Z'
					fill='white'
				/>
			</svg>
		),
		text: 'Широкий перечень материалов',
	},
	{
		icon: (
			<svg
				width='42'
				height='46'
				viewBox='0 0 42 46'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M20.5889 21.7793L1.22949 10.7461C1.39355 10.5684 1.56445 10.4043 1.74219 10.2539C1.93359 10.0898 2.13184 9.94629 2.33691 9.82324L18.251 0.65625C18.9893 0.21875 19.7617 0 20.5684 0C21.3887 0 22.1748 0.21875 22.9268 0.65625L38.8203 9.82324C39.0391 9.94629 39.2373 10.0898 39.415 10.2539C39.6064 10.4043 39.7773 10.5615 39.9277 10.7256L20.5889 21.7793ZM18.8662 24.8145V45.8145C18.7568 45.7734 18.6475 45.7256 18.5381 45.6709C18.4424 45.6162 18.3467 45.5615 18.251 45.5068L2.33691 36.2988C1.59863 35.875 1.02441 35.3076 0.614258 34.5967C0.204102 33.8857 -0.000976562 33.1064 -0.000976562 32.2588V14.3555C-0.000976562 14.2324 -0.000976562 14.1436 -0.000976562 14.0889L18.8662 24.8145ZM22.291 24.8145L41.1582 14.0684C41.1582 14.1094 41.1582 14.1572 41.1582 14.2119C41.1582 14.2529 41.1582 14.2939 41.1582 14.335V32.2588C41.1582 33.1064 40.9531 33.8857 40.543 34.5967C40.1328 35.3076 39.5586 35.875 38.8203 36.2988L22.9268 45.5068C22.708 45.6436 22.4961 45.7461 22.291 45.8145V24.8145Z'
					fill='white'
				/>
			</svg>
		),
		text: 'Полноценные рендеры проектов',
	},
	{
		icon: (
			<svg
				width='52'
				height='52'
				viewBox='0 0 52 52'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M26.0003 1.85714C12.6672 1.85714 1.85742 12.6669 1.85742 26C1.85742 39.3331 12.6672 50.1429 26.0003 50.1429C39.3334 50.1429 50.1431 39.3331 50.1431 26C50.1431 12.6669 39.3334 1.85714 26.0003 1.85714ZM37.1431 29.7143H26.0003C25.5077 29.7143 25.0354 29.5186 24.6871 29.1703C24.3388 28.8221 24.1431 28.3497 24.1431 27.8571V11.1429C24.1431 10.6503 24.3388 10.1779 24.6871 9.82966C25.0354 9.48137 25.5077 9.28571 26.0003 9.28571C26.4928 9.28571 26.9652 9.48137 27.3135 9.82966C27.6618 10.1779 27.8574 10.6503 27.8574 11.1429V26H37.1431C37.6357 26 38.1081 26.1957 38.4563 26.5439C38.8046 26.8922 39.0003 27.3646 39.0003 27.8571C39.0003 28.3497 38.8046 28.8221 38.4563 29.1703C38.1081 29.5186 37.6357 29.7143 37.1431 29.7143Z'
					fill='#FAFAFA'
				/>
			</svg>
		),
		text: 'Срок изготовления от 20 до 45 дней',
	},
	{
		icon: (
			<svg
				width='42'
				height='44'
				viewBox='0 0 42 44'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M4.17383 43.8965C2.87174 43.8965 1.84635 43.6035 1.09766 43.0176C0.365234 42.4479 -0.000976562 41.6585 -0.000976562 40.6494C-0.000976562 39.0706 0.471029 37.4186 1.41504 35.6934C2.35905 33.9518 3.72624 32.3242 5.5166 30.8105C7.30697 29.2806 9.46354 28.0436 11.9863 27.0996C14.5254 26.1393 17.3737 25.6592 20.5312 25.6592C23.7051 25.6592 26.5534 26.1393 29.0762 27.0996C31.6152 28.0436 33.7718 29.2806 35.5459 30.8105C37.3363 32.3242 38.7035 33.9518 39.6475 35.6934C40.6077 37.4186 41.0879 39.0706 41.0879 40.6494C41.0879 41.6585 40.7135 42.4479 39.9648 43.0176C39.2324 43.6035 38.2152 43.8965 36.9131 43.8965H4.17383ZM20.5557 21.2891C18.8141 21.2891 17.2028 20.8171 15.7217 19.873C14.2406 18.9128 13.0443 17.627 12.1328 16.0156C11.2376 14.388 10.79 12.5651 10.79 10.5469C10.79 8.5612 11.2376 6.77083 12.1328 5.17578C13.0443 3.58073 14.2406 2.31934 15.7217 1.3916C17.2028 0.463867 18.8141 0 20.5557 0C22.2972 0 23.9085 0.455729 25.3896 1.36719C26.8708 2.27865 28.0589 3.5319 28.9541 5.12695C29.8656 6.70573 30.3213 8.49609 30.3213 10.498C30.3213 12.5326 29.8656 14.3636 28.9541 15.9912C28.0589 17.6188 26.8708 18.9128 25.3896 19.873C23.9085 20.8171 22.2972 21.2891 20.5557 21.2891Z'
					fill='white'
				/>
			</svg>
		),
		text: 'Персональный менеджер',
	},
];

const portfolioWorks: PartnersPortfolioWork[] = [
	{
		photos: [
			'/sliders/examples/yellow.jpg',
			'/sliders/examples/green.jpg',
			'/sliders/examples/black.jpg',
		],
		photoAlt: 'Квартира в Москва-сити',
		title: 'Квартира в Москва-сити',
		area: '180 м²',
		date: 'Апрель — Май 2026',
		text: 'Полная меблировка квартиры под ключ в элитном ЖК',
	},
	{
		photos: [
			'/sliders/examples/green.jpg',
			'/sliders/examples/blue.jpg',
			'/sliders/examples/turquoise.jpg',
		],
		photoAlt: 'Квартира в ЖК',
		title: 'Квартира в современном ЖК',
		area: '140 м²',
		date: 'Март — Апрель 2026',
		text: 'Корпусная мебель по индивидуальному дизайн-проекту',
	},
	{
		photos: [
			'/sliders/examples/black.jpg',
			'/sliders/examples/turquoise.jpg',
			'/sliders/examples/yellow.jpg',
		],
		photoAlt: 'Квартира на Патриках',
		title: 'Квартира на Патриках',
		area: '165 м²',
		date: 'Январь — Март 2026',
		text: 'Комплексная меблировка жилого пространства',
	},
	{
		photos: ['/sliders/examples/blue.jpg'],
		photoAlt: 'Квартира в Москва-сити',
		title: 'Квартира в Москва-сити',
		area: '125 м²',
		date: 'Апрель — Май 2026',
		text: 'Полная меблировка квартиры под ключ',
	},
	{
		photos: ['/sliders/examples/turquoise.jpg'],
		photoAlt: 'Современная квартира',
		title: 'Современная квартира',
		area: '120 м²',
		date: 'Ноябрь — Декабрь 2025',
		text: 'Мебель по индивидуальным размерам',
	},
];

const partnerBenefits: PartnersBenefit[] = [
	{
		title: 'Учитываем каждый нюанс и&nbsp;м²',
		description:
			'Внимательно изучаем проект и спецификацию, чтобы учесть особенности помещения и реализовать задуманное без компромиссов.',
		image: buildersImage,
		imageAlt: 'Специалисты мебельного производства',
		color: 'green',
	},
	{
		title: 'Расчет стоимости день в&nbsp;день',
		description:
			'Оперативно рассчитываем стоимость проекта и предоставляем понятное коммерческое предложение.',
		image: calendarImage,
		imageAlt: 'Расчет стоимости проекта',
		color: 'blue',
	},
	{
		title: 'Детальная смета по каждому изделию',
		description:
			'Предоставляем подробную смету по каждому изделию, материалам, фурнитуре и этапам производства.',
		image: modelImage,
		imageAlt: 'Детальная смета проекта',
		color: 'pink',
	},
	{
		title: 'Прогрессивное вознаграждение от&nbsp;10%',
		description:
			'Чем больше совместных проектов, тем выше процент партнерского вознаграждения.',
		image: moneyImage,
		imageAlt: 'Партнерское вознаграждение',
		color: 'peach',
	},
];

const getKitchenWorks = async (): Promise<IWork[]> => {
	try {
		const works = await PortfolioService.getAllWorks();

		return works
			.filter((work) => {
				const type = `${work.type?.name ?? ''} ${work.type?.caption ?? ''}`;

				return /кух|kitchen/i.test(type);
			})
			.slice(0, 4);
	} catch {
		return [];
	}
};

const Page = async () => {
	const kitchenWorks = await getKitchenWorks();

	return (
		<>
			<main className={styles.main}>
				<LinkScreen
					photo='/sliders/main/start-slider-1.png'
					photoAlt='Кухня'
					title='Надежный партнер по производству мебели для ваших проектов'
					text='Помогаем ремонтным бюро и дизайнерам реализовывать интерьерные проекты от отдельных изделий до комплексных объектов'
					popupClaimTypeOptions={['Дизайнер интерьера', 'Ремонтное бюро']}
				/>
				<Advantages elements={advantages} />
				<PartnersPortfolio works={portfolioWorks} />

				<PartnersBenefits
					benefits={partnerBenefits}
					popupClaimTypeOptions={['Дизайнер интерьера', 'Ремонтное бюро']}
				/>
				<PartnersHowWeWork />
				<PartnersOtherWorks works={kitchenWorks} />

				<Footer
					isFormContact
					contactFormTitle={
						<>
							Давайте рассмотрим <br /> ваш проект
						</>
					}
				/>
			</main>
		</>
	);
};

export default Page;
