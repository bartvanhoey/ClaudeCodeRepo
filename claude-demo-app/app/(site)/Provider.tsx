"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import ToasterContext from "../context/ToastContext";
import { ProductsProvider } from "../context/ProductsContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="light"
        >
            <ProductsProvider>
                <Lines />
                <Header />
                <ToasterContext />
                {children}
                <Footer />
                <ScrollToTop />
            </ProductsProvider>
        </ThemeProvider>
    );
}
