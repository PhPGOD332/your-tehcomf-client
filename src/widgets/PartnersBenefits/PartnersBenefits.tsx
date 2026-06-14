'use client';

import Image, { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './PartnersBenefits.module.scss';
import GreenButton from '@/shared/UI/GreenButton/GreenButton';
import PopupForm from '../PopupForm/PopupForm';
import { useState } from 'react';

export type PartnersBenefitColor = 'green' | 'blue' | 'pink' | 'peach';

export interface PartnersBenefit {
	title: string;
	description: string;
	image: StaticImageData;
	imageAlt: string;
	color: PartnersBenefitColor;
}

interface PartnersBenefitsProps {
	benefits: PartnersBenefit[];
	popupClaimTypeOptions?: readonly [string, string];
}

const PartnersBenefits = ({
	benefits,
	popupClaimTypeOptions,
}: PartnersBenefitsProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<PopupForm
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				claimTypeOptions={popupClaimTypeOptions}
			/>
			<section className={styles.section}>
				<div className={styles.container}>
					<h2 className={styles.title}>Выгода для&nbsp;партнера</h2>

					<div className={styles.desktopContent}>
						<div className={styles.desktopBenefits}>
							{benefits.map((benefit) => (
								<article className={styles.desktopBenefit} key={benefit.title}>
									<h3
										className={styles.desktopBenefitTitle}
										dangerouslySetInnerHTML={{ __html: benefit.title }}
									/>
									<p className={styles.desktopBenefitDescription}>
										{benefit.description}
									</p>
								</article>
							))}
							<GreenButton
								classNames={styles.desktopButton}
								onClick={() => setIsModalOpen(true)}
							>
								Узнать подробнее
							</GreenButton>
						</div>
					</div>

					<Swiper
						className={styles.mobileSlider}
						slidesPerView='auto'
						spaceBetween={8}
						grabCursor
					>
						{benefits.map((benefit) => (
							<SwiperSlide className={styles.mobileSlide} key={benefit.title}>
								<article
									className={`${styles.mobileCard} ${styles[`mobileCard_${benefit.color}`]}`}
								>
									<h3
										className={styles.mobileCardTitle}
										dangerouslySetInnerHTML={{ __html: benefit.title }}
									/>
									<div className={styles.mobileImageWrapper}>
										<Image
											src={benefit.image}
											alt={benefit.imageAlt}
											fill
											sizes='220px'
											className={styles.mobileImage}
										/>
									</div>
									<GreenButton classNames={styles.mobileButton}>
										Подробнее
									</GreenButton>
								</article>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>
		</>
	);
};

export default PartnersBenefits;
