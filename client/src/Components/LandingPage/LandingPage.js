import React from 'react'
import AboutUs from './AboutUs/AboutUs'
import Header from './Header/Header'
import NextEvent from './NextEvent/NextEvent'
import OurServices from './OurServices/Services'
import Footer from './Footer/Footer'


export default function LandingPage() {
    return (
        <div>
            <Header LandingPage={true} />
            <NextEvent />
            <AboutUs />
            <OurServices />
            <Footer />

        </div>
    )
}
