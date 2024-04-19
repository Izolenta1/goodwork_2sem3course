import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainContainer({children}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}