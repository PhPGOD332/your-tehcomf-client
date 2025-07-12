'use client'
import React from "react";
import HeaderMobile from "@/widgets/HeaderMobile/HeaderMobile";
import HeaderDesktop from "@/widgets/HeaderDesktop/HeaderDesktop";
import {useMediaQuery} from "@/shared/hooks/useMediaQuery";

const Header = () => {
    const isMobile = useMediaQuery('(max-width: 1000px)');

    return (
        <>
            { isMobile ?
                <HeaderMobile />
                :
                <HeaderDesktop />
            }
        </>
    );
};

export default Header;