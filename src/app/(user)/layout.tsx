import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/scss/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/modules/effect-coverflow.min.css';
import 'swiper/css/effect-creative';
import '../styles';
import Header from "@/widgets/Header/Header";

export default function RootLayout({
    children,
}: {
   children: React.ReactNode
}) {

    return (
        <>
            <head>
                <title></title>
            </head>
            <body className={'white'}>
                <Header />
                {children}
            </body>
        </>
    );
}