'use client'
import React from "react";
import HeaderMobile from "@/widgets/Header/HeaderMobile/HeaderMobile";
import HeaderDesktop from "@/widgets/Header/HeaderDesktop/HeaderDesktop";
import {useMediaQuery} from "@/shared/hooks/useMediaQuery";
import {pagesLinks} from "@/shared/constants";

export interface HeaderProps {
    navItems: INavItem[];
}

interface ISubNavItem {
    caption: string;
    href: string;
}

export interface INavItem {
    caption: string;
    href?: string;
    subItems?: ISubNavItem[];
    isFull?: boolean;
}

const Header = () => {
    const isMobile = useMediaQuery('(max-width: 1050px)');

    const navItems: INavItem[] = [
        {
            caption: 'Каталог',
            subItems: [
                {
                    caption: 'Кухни',
                    href: ''
                },
                {
                    caption: 'Шкафы',
                    href: ''
                },
                {
                    caption: 'Прихожие',
                    href: ''
                },
                {
                    caption: 'Гардеробные',
                    href: ''
                },
                {
                    caption: 'Гостиные',
                    href: ''
                },
                {
                    caption: 'Детские',
                    href: ''
                },
                {
                    caption: 'Ванные',
                    href: ''
                },
                {
                    caption: 'Для офиса',
                    href: ''
                }
            ],
            isFull: true
        },
        {
            caption: 'Портфолио',
            href: pagesLinks.portfolio
        },
        // {
        //     caption: 'Покупателям',
        //     subItems: [
        //         {
        //             caption: 'Личный кабинет',
        //             href: ''
        //         },
        //         {
        //             caption: 'FAQ',
        //             href: ''
        //         }
        //     ]
        // },
        // {
        //     caption: 'Партнерам',
        //     subItems: [
        //         {
        //             caption: 'Дизайнерам',
        //             href: ''
        //         },
        //         {
        //             caption: 'Подрядчикам',
        //             href: ''
        //         },
        //         {
        //             caption: 'B2B',
        //             href: ''
        //         }
        //     ]
        // },
        {
            caption: 'О компании',
            href: pagesLinks.aboutCompany
        },
        {
            caption: 'Партнерам',
            href: pagesLinks.partners
        },
        {
            caption: 'Контакты',
            href: pagesLinks.contacts
        },
    ]

    return (
        <>
            { isMobile ?
                <HeaderMobile navItems={navItems} />
                :
                <HeaderDesktop navItems={navItems} />
            }
        </>
    );
};

export default Header;