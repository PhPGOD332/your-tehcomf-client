'use client'
import React, {useState} from 'react';
import styles from './Questions.module.scss';
import SubTitle, {TitleColors} from "@/shared/UI/SubTitle/SubTitle";
import {IQuestion} from "@/types/IQuestion";
import {IQuestionCategory} from "@/types/IQuestionCategory";
import MiniTitle from "@/shared/UI/MiniTitle/MiniTitle";

export interface QuestionsProps {
    title?: string;
    questions: IQuestion[];
    questionsCategories: IQuestionCategory[];
}

const Questions = (
    {
        title,
        questions,
        questionsCategories
    }: QuestionsProps) => {

    const [questionsView, setQuestionsView] = useState<IQuestion[]>(questions.filter(question => question.categoryId === questionsCategories[0].id))

    const questionMarkerHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const summary = e.currentTarget?.parentElement;
        const details = summary?.parentElement as HTMLDetailsElement;
        const svgElement = e.currentTarget.children.item(0) instanceof SVGSVGElement ? e.currentTarget.children.item(0) : null;
        const answerElement = details?.children.item(1);

        if (details) {
            details.open = !details.open;

            if (details.open) {
                svgElement?.classList.add(styles.opened);
                svgElement?.classList.remove(styles.closed);

                answerElement?.classList.add(styles.questionAnswer_visible);
                answerElement?.classList.remove(styles.questionAnswer_hidden);
            } else {
                svgElement?.classList.add(styles.closed);
                svgElement?.classList.remove(styles.opened);

                answerElement?.classList.add(styles.questionAnswer_hidden);
                answerElement?.classList.remove(styles.questionAnswer_visible);
            }
        }
    }

    const selectCategoryHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const categoryId = e?.currentTarget.getAttribute('data-id') as unknown;
        setQuestionsView(questions.filter(question => question.categoryId == categoryId as number));

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
                        <SubTitle color={TitleColors.BLACK}>{title || 'Часто задаваемые вопросы'}</SubTitle>
                        {questionsCategories.map((category, num) =>
                            <div className={`${styles.category} ${num === 0 ? styles.category_selected : ''}`} key={category.id} data-id={category.id} onClick={(e) => selectCategoryHandler(e)}>
                                <span className={styles.categoryCaption}>{category.name}</span>
                            </div>
                        )}
                    </div>
                    <div className={styles.questionsSide}>
                        {questionsView
                            .map((question) =>
                                <details
                                    className={styles.questionItem}
                                    key={question.id}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <summary>
                                        <MiniTitle>{question.question}</MiniTitle>
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
                                    <p className={styles.questionAnswer}>{question.answer}</p>
                                </details>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questions;