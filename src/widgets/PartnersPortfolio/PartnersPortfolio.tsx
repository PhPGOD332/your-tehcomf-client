'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import styles from './PartnersPortfolio.module.scss';

export interface PartnersPortfolioWork {
	photos: [string, ...string[]];
	photoAlt?: string;
	title: string;
	meta?: string[];
	text?: string;
	href: string;
}

interface PartnersPortfolioProps {
	works: PartnersPortfolioWork[];
}

const SliderNavigation = () => {
	const swiper = useSwiper();
	const [isBeginning, setIsBeginning] = useState(swiper.isBeginning);
	const [isEnd, setIsEnd] = useState(swiper.isEnd);

	useEffect(() => {
		const updateNavigationState = () => {
			setIsBeginning(swiper.isBeginning);
			setIsEnd(swiper.isEnd);
		};

		updateNavigationState();
		swiper.on('slideChange', updateNavigationState);
		swiper.on('reachBeginning', updateNavigationState);
		swiper.on('reachEnd', updateNavigationState);
		swiper.on('fromEdge', updateNavigationState);
		swiper.on('resize', updateNavigationState);

		return () => {
			swiper.off('slideChange', updateNavigationState);
			swiper.off('reachBeginning', updateNavigationState);
			swiper.off('reachEnd', updateNavigationState);
			swiper.off('fromEdge', updateNavigationState);
			swiper.off('resize', updateNavigationState);
		};
	}, [swiper]);

	return (
		<div className={styles.navigation}>
			<button
				type='button'
				className={styles.navigationButton}
				aria-label='Предыдущий проект'
				onClick={() => swiper.slidePrev()}
				disabled={isBeginning}
			>
				<svg
					width='21'
					height='15'
					viewBox='0 0 21 15'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M19.293 7.5H1.79297M7.29297 1.5L1.64652 7.14645C1.45126 7.34171 1.45126 7.65829 1.64652 7.85355L7.29297 13.5'
						stroke='currentColor'
						strokeWidth='3'
						strokeLinecap='round'
					/>
				</svg>
			</button>
			<button
				type='button'
				className={styles.navigationButton}
				aria-label='Следующий проект'
				onClick={() => swiper.slideNext()}
				disabled={isEnd}
			>
				<svg
					width='21'
					height='15'
					viewBox='0 0 21 15'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M1.5 7.5H19M13.5 1.5L19.1464 7.14645C19.3417 7.34171 19.3417 7.65829 19.1464 7.85355L13.5 13.5'
						stroke='currentColor'
						strokeWidth='3'
						strokeLinecap='round'
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
							<SwiperSlide className={styles.slide} key={work.photos[0]}>
								<Link href={work.href} className={styles.desktopCard}>
									<Image
										src={work.photos[0]}
										alt={work.photoAlt || work.title}
										fill
										sizes='(max-width: 1400px) 55vw, 720px'
										className={styles.image}
									/>
									<div className={styles.overlay} />
									<div className={styles.desktopTop}>
										<h3 className={styles.desktopCardTitle}>{work.title}</h3>
										{work.meta && work.meta.length > 0 && (
											<div className={styles.desktopMeta}>
												{work.meta.map((item) => (
													<span className={styles.metaItem} key={item}>
														{item}
													</span>
												))}
											</div>
										)}
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
						<article className={styles.mobileCard} key={work.photos[0]}>
							<Swiper
								className={styles.mobileImageSlider}
								modules={[Pagination]}
								slidesPerView={1}
								spaceBetween={8}
								nested
								pagination={{
									clickable: true,
									horizontalClass: styles.mobilePagination,
									bulletClass: styles.mobilePaginationBullet,
									bulletActiveClass: styles.mobilePaginationBulletActive,
								}}
							>
								{work.photos.map((photo) => (
									<SwiperSlide className={styles.mobileImageSlide} key={photo}>
										<Image
											src={photo}
											alt={work.photoAlt || work.title}
											fill
											sizes='calc(100vw - 32px)'
											className={styles.image}
										/>
									</SwiperSlide>
								))}
							</Swiper>
							<Link href={work.href} className={styles.mobileDetails}>
								{work.meta && work.meta.length > 0 && (
									<div className={styles.mobileMeta}>
										{work.meta.map((item) => (
											<span className={styles.metaItem} key={item}>
												{item}
											</span>
										))}
									</div>
								)}
								<h3 className={styles.mobileCardTitle}>{work.title}</h3>
								{work.text && <p className={styles.mobileText}>{work.text}</p>}
							</Link>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default PartnersPortfolio;
