'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { pagesLinks } from '@/shared/constants';
import styles from './PartnersPortfolio.module.scss';

export interface PartnersPortfolioWork {
	photo: string;
	photoAlt?: string;
	title: string;
	area: string;
	date: string;
	text?: string;
}

interface PartnersPortfolioProps {
	works: PartnersPortfolioWork[];
}

const SliderNavigation = () => {
	const swiper = useSwiper();

	return (
		<div className={styles.navigation}>
			<button
				type='button'
				className={styles.navigationButton}
				aria-label='Предыдущий проект'
				onClick={() => swiper.slidePrev()}
			>
				{/* TODO: заменить временную SVG-стрелку на финальную. */}
				<svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
					<path
						d='M11.5 4L6.5 9L11.5 14'
						stroke='currentColor'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
			<button
				type='button'
				className={styles.navigationButton}
				aria-label='Следующий проект'
				onClick={() => swiper.slideNext()}
			>
				{/* TODO: заменить временную SVG-стрелку на финальную. */}
				<svg width='18' height='18' viewBox='0 0 18 18' fill='none'>
					<path
						d='M6.5 4L11.5 9L6.5 14'
						stroke='currentColor'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
		</div>
	);
};

const PartnersPortfolio = ({ works }: PartnersPortfolioProps) => {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h2 className={styles.title}>Портфолио</h2>

				<div className={styles.desktopSlider}>
					<Swiper
						className={styles.swiper}
						slidesPerView='auto'
						spaceBetween={20}
						grabCursor
					>
						{works.map((work) => (
							<SwiperSlide className={styles.slide} key={work.photo}>
								<Link
									href={pagesLinks.portfolio}
									className={styles.desktopCard}
								>
									<Image
										src={work.photo}
										alt={work.photoAlt || work.title}
										fill
										sizes='(max-width: 1400px) 55vw, 720px'
										className={styles.image}
									/>
									<div className={styles.overlay} />
									<div className={styles.desktopTop}>
										<div className={styles.desktopHeading}>
											<h3 className={styles.desktopCardTitle}>{work.title}</h3>
											<span className={styles.desktopDivider}>•</span>
											<span className={styles.desktopArea}>{work.area}</span>
										</div>
										<span className={styles.date}>{work.date}</span>
									</div>
									{work.text && (
										<p className={styles.desktopText}>{work.text}</p>
									)}
								</Link>
							</SwiperSlide>
						))}
						<SliderNavigation />
					</Swiper>
				</div>

				<div className={styles.mobileList}>
					{works.slice(0, 3).map((work) => (
						<Link
							href={pagesLinks.portfolio}
							className={styles.mobileCard}
							key={work.photo}
						>
							<div className={styles.mobileImageWrapper}>
								<Image
									src={work.photo}
									alt={work.photoAlt || work.title}
									fill
									sizes='calc(100vw - 32px)'
									className={styles.image}
								/>
							</div>
							<div className={styles.mobileMeta}>
								<span>{work.area}</span>
								<span className={styles.mobileMetaDivider}>•</span>
								<span>{work.date}</span>
							</div>
							<h3 className={styles.mobileCardTitle}>{work.title}</h3>
							{work.text && <p className={styles.mobileText}>{work.text}</p>}
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default PartnersPortfolio;
