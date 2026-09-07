import '@/app/styles/globals.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-creative';
import './styles';
import type { Metadata, Viewport } from 'next';
import { YANDEX_METRIKA_ID } from '@/shared/config/analytics';
import { pagesData } from '@/shared/constants';
import {
	createPageMetadata,
	organizationStructuredData,
	websiteStructuredData,
} from '@/shared/seo';
import CookiesBanner from '@/widgets/CookiesBanner/CookiesBanner';
import {
	YandexMetrika,
	YandexMetrikaHead,
} from '@/widgets/YandexMetrika/YandexMetrika';

export const metadata: Metadata = createPageMetadata(pagesData.main);

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const structuredData = [organizationStructuredData, websiteStructuredData];

	return (
		<html lang='ru'>
			<head>
				<YandexMetrikaHead counterId={YANDEX_METRIKA_ID} />
			</head>
			<body className='white'>
				<YandexMetrika counterId={YANDEX_METRIKA_ID} />
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				/>
				{children}
				<CookiesBanner />
			</body>
		</html>
	);
}
