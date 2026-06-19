import '@/app/styles/globals.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/modules/effect-coverflow.min.css';
import 'swiper/css/effect-creative';
import './styles';
import type { Metadata, Viewport } from 'next';
import { pagesData } from '@/shared/constants';
import {
	createPageMetadata,
	organizationStructuredData,
	websiteStructuredData,
} from '@/shared/seo';
import YandexMetrika from '@/widgets/YandexMetrika/YandexMetrika';

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
			<body className='white'>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
				/>
				{children}
				<YandexMetrika />
			</body>
		</html>
	);
}
