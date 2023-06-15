import Header from "../partials/Header"
import Navbar from "../partials/Navbar"
import Footer from "../partials/Footer"

const MainLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout