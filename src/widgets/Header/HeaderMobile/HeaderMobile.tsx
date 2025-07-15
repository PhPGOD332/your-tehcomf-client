import React, {useEffect, useRef, useState} from 'react'
import styles from './HeaderMobile.module.scss';
import TextInput from "@/shared/UI/TextInput/TextInput";
import PopupForm from "@/widgets/PopupForm/PopupForm";
import Link from "next/link";
import {HeaderProps} from "@/widgets/Header/Header";

const HeaderMobile = (
    {
        navItems
    }: HeaderProps) => {
    const [isOpenPopupForm, setIsOpenPopupForm] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);

    const navButtonRef = useRef<HTMLDivElement | null>(null);
    const searchButtonRef = useRef<HTMLDivElement | null>(null);
    const searchBlockRef = useRef<HTMLDivElement | null>(null);
    const searchInputBlockRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLAnchorElement | null>(null);
    const navBlockRef = useRef<HTMLDivElement| null>(null);
    const navModalRef = useRef<HTMLDivElement | null>(null);

    const searchClickHandle = () => {
        setIsSearchActive(true);
    }

    const searchBackClickHandle = () => {
        setIsSearchActive(false);
    }

    const navButtonClickHandle = () => {
        navButtonRef.current?.classList.toggle(styles.navButton_active);
        navModalRef.current?.classList.toggle(styles.navModal_active);
    }

    useEffect(() => {
        if (isSearchActive) {
            logoRef.current?.classList.add(styles.hide);
            navBlockRef.current?.classList.add(styles.hide);
            searchBlockRef.current?.classList.add(styles.searchBlock_active);
            searchInputBlockRef.current?.classList.add(styles.inputSearchBlock_active);
            searchButtonRef.current?.classList.add(styles.searchButton_active);
        } else {
            searchButtonRef.current?.classList.remove(styles.searchButton_active);
            searchBlockRef.current?.classList.remove(styles.searchBlock_active);
            searchInputBlockRef.current?.classList.remove(styles.inputSearchBlock_active);

            logoRef.current?.classList.remove(styles.hide);
            navBlockRef.current?.classList.remove(styles.hide);
        }
    }, [isSearchActive]);

    const navItemClickHandle = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const navButton = e.currentTarget;
        const navBlock = navButton.parentElement;
        if (!navBlock) return;

        const navLiEl = navBlock.parentElement;
        if (!navLiEl) return;

        const subNavList = navBlock.nextElementSibling;

        if (!subNavList) return;

        if(subNavList?.getAttribute('data-is-set')) {
            navLiEl.classList.toggle(styles.navLiEl_active);
        }
    }

    return (
        <>
            <header className={styles.mobileHeader}>
                <div className={styles.searchBlock} ref={searchBlockRef}>
                    <div className={styles.inputSearchBlock} ref={searchInputBlockRef}>
                        <div
                            className={styles.backButton}
                            onClick={() => searchBackClickHandle()}
                        >
                            <svg width="10" height="17" viewBox="0 0 10 17" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9 0.999982L1.77817 7.77055C1.35676 8.16563 1.35676 8.83455 1.77818 9.22962L9 16"
                                    stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <TextInput
                            placeholder={'Введите запрос'}
                            classNames={styles.searchInput}
                        />
                    </div>
                    <div
                        className={styles.searchButton}
                        ref={searchButtonRef}
                        onClick={() => searchClickHandle()}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.6667 25.3333C20.5577 25.3333 25.3333 20.5577 25.3333 14.6667C25.3333 8.77563 20.5577 4 14.6667 4C8.77563 4 4 8.77563 4 14.6667C4 20.5577 8.77563 25.3333 14.6667 25.3333Z"
                                stroke="#29292B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M27.9999 27.9997L22.1999 22.1997" stroke="#29292B" strokeWidth="3"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                <Link href='https://tehcomf.ru' className={styles.logoBlock} ref={logoRef}>
                    <svg width="60" height="60" viewBox="0 0 72 72" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M25.1714 19.0226C25.1714 18.6914 25.2722 18.4178 25.4738 18.173C25.6754 17.9426 25.9778 17.813 26.381 17.813H28.541C28.7282 17.7842 28.8578 17.7554 28.9442 17.7554C29.0882 17.7554 29.2178 17.7698 29.333 17.813H31.3058C31.5938 17.813 31.8962 17.9282 32.1986 18.1442C32.501 18.3602 32.645 18.6482 32.645 19.0226V35.8994L65.0594 3.45624C65.405 3.11064 65.765 3.11064 66.125 3.45624C66.485 3.81624 66.485 4.19064 66.125 4.55064L36.533 34.157L64.1378 65.8658C64.7858 66.557 64.685 66.9602 63.9794 66.9602H55.685C55.2242 66.9602 54.9938 66.6866 54.4898 66.1106L31.3058 39.4418L29.7506 40.997V57.8594C29.7506 58.3922 29.4914 58.6514 28.9586 58.6514C28.4546 58.6514 28.1954 58.3922 28.1954 57.8594V42.5522L25.1858 45.5618V19.0226H25.1714Z"
                            fill="#58595B"/>
                        <path
                            d="M65.477 59.3858V13.5075H65.4626V11.6931C65.4626 11.2611 65.117 10.9155 64.685 10.9155C64.253 10.9155 63.9074 11.2611 63.9074 11.6931V13.5219V14.8467V59.1411C63.9074 60.3363 63.5618 61.4307 62.9858 62.3811L64.1522 63.7202C64.973 62.4818 65.477 60.9842 65.477 59.3858Z"
                            fill="#00A651"/>
                        <path
                            d="M53.6832 67.0032L52.3152 65.4192H26.1072C22.6368 65.4192 19.8144 62.5968 19.8144 59.1264V49.8096L22.536 47.088V15.1776H32.688C33.12 15.1776 33.4656 15.0336 33.696 14.76C33.9264 14.472 34.056 14.1408 34.056 13.7376V8.91358C34.0128 8.51038 33.8544 8.20798 33.5808 8.00638C33.2928 7.80478 33.0048 7.70398 32.688 7.70398H4.80965C4.44965 7.70398 4.11845 7.81918 3.84485 8.06398C3.55685 8.29438 3.42725 8.58238 3.42725 8.91358V13.7232C3.42725 14.1552 3.57125 14.5152 3.84485 14.7744C4.13285 15.0336 4.44965 15.1776 4.80965 15.1776H15.0768V54.5184L18.216 51.408L18.2304 57.8592C18.2304 57.9024 18.2304 57.9312 18.2304 57.96V59.3856C18.2304 63.6192 21.672 67.0608 25.9056 67.0608H53.712C53.6976 67.032 53.6832 67.0176 53.6832 67.0032Z"
                            fill="#00A651"/>
                    </svg>
                </Link>
                <div
                    className={styles.navBlock}
                    ref={navBlockRef}
                >
                    <div
                        className={styles.navButton}
                        ref={navButtonRef}
                        onClick={() => navButtonClickHandle()}
                    >
                        <svg width="23" height="23" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className={styles.bottom} d="M1 17H21.9139" stroke="#0A0A0A" strokeWidth="2"
                                  strokeLinecap="round"/>
                            <path className={styles.middle} d="M9 9H22" stroke="#0A0A0A" strokeWidth="2"
                                  strokeLinejoin="round"/>
                            <path className={styles.top} d="M1 1L21.9139 1" stroke="#0A0A0A" strokeWidth="2"
                                  strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>
            </header>
            <nav
                className={styles.navModal}
                ref={navModalRef}
            >
                <ul className={styles.navList}>
                    {navItems.map((navItem, navIndex) =>
                        <li
                            className={styles.navLiEl}
                            key={navIndex}
                        >
                            <div className={styles.navItemBlock}>
                                <Link
                                    href={navItem.href ?? ''}
                                    className={styles.navItem}
                                    data-full={navItem.isFull}
                                >{navItem.caption}</Link>
                                {!!navItem.subItems
                                    ?
                                    <div
                                        className={styles.navItemButton}
                                        onClick={(e) => navItemClickHandle(e)}
                                    >
                                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M1 1.5L6.35982 5.96651C6.73066 6.27555 7.26934 6.27555 7.64018 5.96651L13 1.5"
                                                stroke="#58595B" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>

                                    </div>
                                    :
                                    ''
                                }
                            </div>
                            {navItem.subItems
                                ?
                                <ul className={styles.subNavList} data-is-set={!!navItem.subItems}>
                                    {navItem.subItems?.map((subNavItem, subNavIndex) =>
                                        <li key={subNavIndex}>
                                            <Link
                                                href={subNavItem.href}
                                                className={styles.subNavItem}
                                            >{subNavItem.caption}</Link>
                                        </li>
                                    )}
                                </ul>
                                :
                                ''
                            }
                        </li>
                    )}
                </ul>
                <div className={styles.personAccBlock}>
                    <span className={styles.personAccSpan}>Личный кабинет</span>
                    <div className={styles.personAccButton}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15 21.5H19C19.5304 21.5 20.0391 21.2893 20.4142 20.9142C20.7893 20.5391 21 20.0304 21 19.5V5.5C21 4.96957 20.7893 4.46086 20.4142 4.08579C20.0391 3.71071 19.5304 3.5 19 3.5H15"
                                stroke="#00A651" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 17.5L15 12.5L10 7.5" stroke="#00A651" strokeWidth="2.2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M15 12.5H3" stroke="#00A651" strokeWidth="2.2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>

                    </div>
                </div>
            </nav>
            <PopupForm
                isOpen={isOpenPopupForm}
                setIsOpen={setIsOpenPopupForm}
            />
        </>
    );
};

export default HeaderMobile;