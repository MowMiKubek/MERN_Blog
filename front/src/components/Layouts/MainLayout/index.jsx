import Header from "../partials/Header"
import Navbar from "../partials/Navbar"
import Footer from "../partials/Footer"

import { Outlet } from "react-router-dom"

const MainLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <Header />
            <main className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                        <Outlet />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout