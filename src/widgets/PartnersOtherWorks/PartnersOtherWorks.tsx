'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { pagesLinks } from '@/shared/constants';
import { type IWork } from '@/types/IWork';
import SliderImagesHover from '@/widgets/SliderHover/SliderImagesHover';
import styles from './PartnersOtherWorks.module.scss';

interface PartnersOtherWorksProps {
	works: IWork[];
}

interface WorkCardProps {
	work: IWork;
}

const WorkCard = ({ work }: WorkCardProps) => {
	const [imageWrapperWidth, setImageWrapperWidth] = useState(0);

	return (
		// TODO: исправить здесь ссылку на работу, когда будет страница работы
		<Link href={'#'} className={styles.workCard}>
			<div
				ref={(element) => {
					if (element && imageWrapperWidth !== element.clientWidth) {
						setImageWrapperWidth(element.clientWidth);
					}
				}}
				className={styles.imageWrapper}
			>
				{work.images.length > 0 && imageWrapperWidth > 0 && (
					<div className={styles.desktopImages}>
						<SliderImagesHover
							widthSlider={imageWrapperWidth}
							images={work.images}
						/>
					</div>
				)}
				{work.images[0] && (
					<Image
						loader={() => work.images[0].src}
						src={work.images[0].src}
						alt={work.images[0].imageAlt || work.title}
						fill
						unoptimized
						className={styles.mobileImage}
					/>
				)}
			</div>
			<span className={styles.workType}>{work.type?.caption || 'Кухня'}</span>
			<h3 className={styles.workTitle}>{work.title}</h3>
		</Link>
	);
};

const SearchIcon = () => (
	<svg
		width='88'
		height='88'
		viewBox='0 0 88 88'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M40.3333 69.6667C56.5337 69.6667 69.6667 56.5337 69.6667 40.3333C69.6667 24.133 56.5337 11 40.3333 11C24.133 11 11 24.133 11 40.3333C11 56.5337 24.133 69.6667 40.3333 69.6667Z'
			stroke='currentColor'
			strokeWidth='8'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M76.9969 76.9969L61.0469 61.0469'
			stroke='currentColor'
			strokeWidth='8'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const PortfolioCard = () => (
	<Link href={pagesLinks.portfolio} className={styles.portfolioCard}>
		<div className={styles.searchCard}>
			<SearchIcon />
		</div>
		<span className={styles.workType}>50+ других работ</span>
		<h3 className={styles.workTitle}>Портфолио</h3>
	</Link>
);

const PartnersOtherWorks = ({ works }: PartnersOtherWorksProps) => {
	if (works.length === 0) return null;

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h2 className={styles.title}>Примеры других работ</h2>

				<div className={styles.desktopGrid}>
					{works.map((work) => (
						<WorkCard work={work} key={work.id} />
					))}
					<PortfolioCard />
				</div>

				<Swiper
					className={styles.mobileSlider}
					slidesPerView='auto'
					spaceBetween={8}
					grabCursor
				>
					{works.map((work) => (
						<SwiperSlide className={styles.mobileSlide} key={work.id}>
							<WorkCard work={work} />
						</SwiperSlide>
					))}
					<SwiperSlide className={styles.mobileSlide}>
						<PortfolioCard />
					</SwiperSlide>
				</Swiper>
			</div>
		</section>
	);
};

export default PartnersOtherWorks;
