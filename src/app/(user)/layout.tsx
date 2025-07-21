import React from 'react';
import '../styles';
import Header from "@/widgets/Header/Header";
import Footer from "@/widgets/Footer/Footer";

export default function RootLayout({
    children,
}: {
   children: React.ReactNode
}) {

    return (
        <>
            <head>

            </head>
            <body className={'white'}>
                <Header />
                {children}
                <Footer isContact={true}/>
            </body>
        </>
    );
}