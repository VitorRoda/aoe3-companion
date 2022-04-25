import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'

export const useGaTracker = () => {
    const location = useLocation()
    const [initialized, setInitialized] = useState()

    useEffect(() => {
        if (!window.location.href.includes('localhost')) {
            ReactGA.initialize(process.env.REACT_APP_GA_ID)
            setInitialized(true)
        }
    }, [])

    useEffect(() => {
        if (initialized) {
            ReactGA.send("pageview");
        }
    }, [initialized, location])
}
