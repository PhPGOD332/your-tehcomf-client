'use client'
import React, {useState} from 'react';
import styles from './Questions.module.scss';
import SubTitle, {TitleColors} from "@/shared/UI/SubTitle/SubTitle";
import {IQuestionCategory} from "@/types/IQuestionCategory";
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";
import {useMediaQuery} from "@/shared/hooks/useMediaQuery";

export interface QuestionsProps {
    title?: string;
    mobileTitle?: string;
    categories: IQuestionCategory[];
}

const Questions = (
    {
        title,
        mobileTitle,
        categories,
    }: QuestionsProps) => {

    const [questionsCategoriesView, ] = useState<IQuestionCategory[]>(categories ?? [])
    const [currentCategoryId, setCurrentCategoryId] = useState<number>(categories ? categories[0].id : 0);
    const isMobile = useMediaQuery('(max-width: 1000px)');

    const questionMarkerHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const summary = e.currentTarget?.parentElement;
        const details = summary?.parentElement as HTMLDetailsElement;
        const svgElement = e.currentTarget.children.item(0) instanceof SVGSVGElement ? e.currentTarget.children.item(0) : null;
        const answerElement = details?.children.item(1);

        if (details) {
            details.open = !details.open;

            if (details.open) {
                details.classList.add(styles.questionItem_active);

                svgElement?.classList.add(styles.opened);
                svgElement?.classList.remove(styles.closed);

                answerElement?.classList.add(styles.questionAnswer_visible);
                answerElement?.classList.remove(styles.questionAnswer_hidden);
            } else {
                details.classList.remove(styles.questionItem_active);

                svgElement?.classList.add(styles.closed);
                svgElement?.classList.remove(styles.opened);

                answerElement?.classList.add(styles.questionAnswer_hidden);
                answerElement?.classList.remove(styles.questionAnswer_visible);
            }
        }
    }

    const selectCategoryHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const categoryId = Number(e?.currentTarget.getAttribute('data-id'));
        // console.log(questionsCategoriesView.find(category => console.log(category.id === currentCategoryId)));

        setCurrentCategoryId(categoryId);

        const category = e.currentTarget?.parentElement;

        if (!category) return;

        for (let i = 0; i <= category?.children.length - 1; i++) {
            category?.children.item(i)?.classList.remove(styles.category_selected);
        }

        e.currentTarget.classList.toggle(styles.category_selected);
    }

    return (
        <div className={styles.wrapper}>
            <div className='container'>
                <div className={styles.innerWrapper}>
                    <div className={styles.categorySide}>
                        <SubTitle classNames={styles.questionsTitle} color={TitleColors.BLACK}>{isMobile ? mobileTitle ?? 'FAQ' : title || 'Часто задаваемые вопросы'}</SubTitle>
                        <div className={styles.questionsCategories}>
                            {questionsCategoriesView.map((category, num) =>
                                <div className={`${styles.category} ${num === 0 ? styles.category_selected : ''}`} key={category.id} data-id={category.id} onClick={(e) => selectCategoryHandler(e)}>
                                    <span className={styles.categoryCaption}>{category.category}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.questionsSide}>
                        {questionsCategoriesView.find(category => category.id === currentCategoryId)?.questions
                            .map((question) =>
                                <details
                                    className={styles.questionItem}
                                    key={question.id}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <summary>
                                        <MiniTitle classNames={styles.questionCaption}>{question.question}</MiniTitle>
                                        <div
                                            className={styles.markerIcon}
                                            onClick={(e) => questionMarkerHandler(e)}
                                        >
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 10.5L12 16.5L18 10.5" stroke="#58595B" strokeWidth="2"
                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>

                                        </div>
                                    </summary>
                                    <p className={styles.questionAnswer}>{question.questionDescription}</p>
                                </details>
                            ) ?? ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questions;