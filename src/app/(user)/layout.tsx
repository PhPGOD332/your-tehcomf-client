import React from 'react';
import Header from "@/widgets/Header/Header";

export default function RootLayout({
    children,
}: {
   children: React.ReactNode
}) {

    return (
        <>
            <Header />
            {children}
        </>
    );
}
