import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'

const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID

export const useGaTracker = () => {
    const location = useLocation()
    const [initialized, setInitialized] = useState()

    useEffect(() => {
        if (!window.location.href.includes('localhost') && GA_MEASUREMENT_ID) {
            ReactGA.initialize(GA_MEASUREMENT_ID)
            setInitialized(true)
        }
    }, [])

    useEffect(() => {
        if (initialized) {
            ReactGA.send("pageview");
        }
    }, [initialized, location])
}
