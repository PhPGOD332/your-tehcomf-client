'use client';

import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import conceptImage from '@/data/images/partners_how_we_work/concept.png';
import designImage from '@/data/images/partners_how_we_work/design.png';
import equipmentImage from '@/data/images/partners_how_we_work/equipment.png';
import productionImage from '@/data/images/partners_how_we_work/production.png';
import qualityImage from '@/data/images/partners_how_we_work/quality-control.png';
import logisticsImage from '@/data/images/partners_how_we_work/logistics.png';
import installationImage from '@/data/images/partners_how_we_work/installation.jpeg';
import styles from './PartnersHowWeWork.module.scss';

interface WorkStage {
	title: string;
	description: string[];
	images: StaticImageData[];
}

const workStages: WorkStage[] = [
	{
		title: 'Концепция',
		description: [
			'1. Изучаем дизайн-проект заказчика;',
			'2. Определяем назначение мебели, габариты, стиль, цветовую гамму и бюджет;',
			'3. Формируем внешний вид и функционал будущего изделия с учетом технических параметров проекта, пожеланий и необходимых материалов;',
			'4. При необходимости делаем перезамер помещения, чтобы исключить ошибки при проектировании;',
			'5. Создаем детальный эскиз и визуализируем;',
			'6. Финальное согласовывание с клиентом или руководителем проекта (дизайнером).',
		],
		images: [conceptImage],
	},
	{
		title: 'Проектирование',
		description: [
			'После полного согласования и подписания договора на изготовление, подготовленные эскизы передаются в конструкторский отдел, где выполняются следующие этапы работ:',
			'1. Деталировка. Разработка чертежей каждого элемента мебели.',
			'2. Создание спецификаций: составление полного списка деталей, необходимого количества плитного материала, фурнитуры, крепежных элементов и аксессуаров.',
			'3. Создаются карты раскроя: оптимизация расположения деталей на листах материала (ЛДСП, МДФ, фанера, дерево) для минимизации отходов и оптимизации ненужных расходов на дополнительное количество материала.',
			'4. Вывод необходимых для производства моделей на специализированном программном обеспечении: работа ведется Базис-Мебельщик, AutoCAD, SolidWorks, bCAD.',
		],
		images: [designImage],
	},
	{
		title: 'Комплектация',
		description: [
			'Когда чертежи готовы, закупается всё необходимое.',
			'Плитные материалы: ЛДСП, МДФ, массив дерева, столешницы.',
			'Кромочные материалы: ПВХ-кромка, меламиновая лента.',
			'Фурнитура: петли, направляющие для ящиков, ручки, подъемные механизмы, конфирматы, эксцентрики и другое.',
			'Расходники: клей, шлифовальные шкурки, сверла, упаковка.',
		],
		images: [equipmentImage],
	},
	{
		title: 'Производство',
		description: [
			'1. Распил плитных материалов на детали нужного размера согласно картам раскроя (на форматно-раскроечных станках или станках с ЧПУ).',
			'2. Кромление (облицовка торцов): нанесение кромки на открытые срезы деталей для защиты от влаги и придания эстетичного вида, которую мы клеим исключительно на PUR.',
			'3. Присадки (сверление): выполнение технологических отверстий под крепеж (петли, стяжки, шканты) и фурнитуру.',
			'4. Фрезеровка. Создание пазов, выборка четвертей, фигурная обработка краев при необходимости.',
			'5. Покраска/лакировка (для МДФ или массива): подготовка поверхности, грунтовка, нанесение эмали или лака, сушка.',
		],
		images: [productionImage],
	},
	{
		title: 'Контроль качества',
		description: [
			'Производим обязательный контроль соответствия размеров чертежам, качества кромки, отсутствия сколов.',
			'Контрольная сборка (на производстве): для сложных или нестандартных изделий проводится сборка на фабрике, чтобы убедиться, что все отверстия совпадают, фурнитура работает корректно, а зазоры минимальны. Это позволяет избежать проблем при монтаже у клиента.',
		],
		images: [qualityImage],
	},
	{
		title: 'Логистика',
		description: [
			'Упаковываем детали в 3-х слойный гофрокартон, при необходимости дополнительно делаем обрешетку для предотвращения повреждений при транспортировке.',
			'Упаковка всей фурнитуры (винтов, заглушек, ручек) в отдельные пакеты/коробки для удобства монтажа.',
			'Каждая упаковка маркируется, чтобы сборщикам было легко найти нужную деталь.',
		],
		images: [logisticsImage],
	},
	{
		title: 'Монтаж',
		description: [
			'1. Бережная транспортировка на объект.',
			'2. Монтаж мебели на месте. Мастера собирают каркас, навешивают фасады, регулируют механизмы (петли, ящики), чтобы всё открывалось плавно и без перекосов.',
			'3. Сдача объекта.',
			'4. Клиент или руководитель проекта (дизайнер) принимает работу, проверяет функциональность и подписывает акт выполненных работ.',
		],
		images: [installationImage],
	},
];

interface StageImagesProps {
	images: StaticImageData[];
	title: string;
	className: string;
}

const StageImages = ({ images, title, className }: StageImagesProps) => {
	if (images.length === 0) return null;

	return (
		<div className={className}>
			{images.map((image, index) => (
				<div
					className={`${styles.imageWrapper} ${
						image.width / image.height > 2 ? styles.imageWrapperWide : ''
					} ${index + 1 === 3 ? styles.imageThird : ''}`}
					key={image.src}
				>
					<Image
						src={image}
						alt={`${title}, изображение ${index + 1}`}
						fill
						sizes='(max-width: 1000px) calc(100vw - 64px), 420px'
						className={`${styles.image} ${
							image.width / image.height > 2 ? styles.imageContain : ''
						}`}
					/>
				</div>
			))}
		</div>
	);
};

const StageDescription = ({ description }: Pick<WorkStage, 'description'>) => (
	<div className={styles.description}>
		{description.map((paragraph) => (
			<p key={paragraph}>{paragraph}</p>
		))}
	</div>
);

const PartnersHowWeWork = () => {
	const [activeStageIndex, setActiveStageIndex] = useState(0);
	const [openMobileStageIndexes, setOpenMobileStageIndexes] = useState(
		() => new Set([0]),
	);
	const [isMobile, setIsMobile] = useState(false);
	const activeStage = workStages[activeStageIndex];
	const sectionRef = useRef<HTMLElement | null>(null);
	const stageRefs = useRef<(HTMLElement | null)[]>([]);
	const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const mobileMedia = window.matchMedia('(max-width: 1000px)');
		const handleViewportChange = () => setIsMobile(mobileMedia.matches);

		handleViewportChange();
		mobileMedia.addEventListener('change', handleViewportChange);

		return () =>
			mobileMedia.removeEventListener('change', handleViewportChange);
	}, []);

	const handleStageClick = (index: number) => {
		if (isMobile) {
			setOpenMobileStageIndexes((currentIndexes) => {
				const nextIndexes = new Set(currentIndexes);

				if (nextIndexes.has(index)) {
					nextIndexes.delete(index);
				} else {
					nextIndexes.add(index);
				}

				return nextIndexes;
			});
			return;
		}

		if (scrollTimeoutRef.current) {
			clearTimeout(scrollTimeoutRef.current);
		}

		setActiveStageIndex(index);

		scrollTimeoutRef.current = setTimeout(() => {
			const stage = stageRefs.current[index];
			const section = sectionRef.current;
			if (!stage || !section) return;

			const navigationOffset = 120;
			const stageTop = window.scrollY + stage.getBoundingClientRect().top;
			const sectionBottom =
				window.scrollY + section.getBoundingClientRect().bottom;
			const targetTop = stageTop - navigationOffset;
			const sectionBottomTop = sectionBottom - window.innerHeight;

			window.scrollTo({
				top: Math.max(0, Math.min(targetTop, sectionBottomTop)),
				behavior: 'smooth',
			});
		}, 500);
	};

	useEffect(
		() => () => {
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
			}
		},
		[],
	);

	return (
		<section ref={sectionRef} className={styles.section}>
			<div className={styles.container}>
				<div className={styles.desktopAside}>
					<h2 className={styles.title}>Как мы работаем</h2>
					<StageImages
						key={activeStage.title}
						images={activeStage.images}
						title={activeStage.title}
						className={styles.desktopImages}
					/>
				</div>

				<h2 className={`${styles.title} ${styles.mobileTitle}`}>
					Как мы работаем
				</h2>

				<div className={styles.accordion}>
					{workStages.map((stage, index) => {
						const isActive = isMobile
							? openMobileStageIndexes.has(index)
							: activeStageIndex === index;
						const contentId = `partners-work-stage-${index}`;

						return (
							<article
								ref={(element) => {
									stageRefs.current[index] = element;
								}}
								className={`${styles.stage} ${isActive ? styles.stageActive : ''}`}
								key={stage.title}
							>
								<button
									type='button'
									className={styles.stageButton}
									aria-expanded={isActive}
									aria-controls={contentId}
									onClick={() => handleStageClick(index)}
								>
									<span className={styles.stageNumber}>{index + 1}</span>
									<span className={styles.stageTitle}>{stage.title}</span>
									<svg
										className={styles.chevron}
										width='16'
										height='10'
										viewBox='0 0 16 10'
										fill='none'
										aria-hidden='true'
									>
										<path
											d='M2 2L8 8L14 2'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</button>

								<div
									id={contentId}
									className={styles.stageContent}
									aria-hidden={!isActive}
								>
									<div className={styles.stageContentInner}>
										<StageDescription description={stage.description} />
										<StageImages
											images={stage.images}
											title={stage.title}
											className={styles.mobileImages}
										/>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default PartnersHowWeWork;
