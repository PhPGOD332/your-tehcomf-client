import React from 'react';
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

            </head>
            <body className={'white'}>
                <Header />
                {children}
            </body>
        </>
    );
}