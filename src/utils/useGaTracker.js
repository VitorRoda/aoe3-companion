import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga'

export const useGaTracker = () => {
    const location = useLocation()
    const [initialized, setInitialized] = useState()

    useEffect(() => {
        if (!window.location.href.includes('localhost')) {
            ReactGA.initialize(process.env.GA_ID)
            setInitialized(true)
        }
    }, [])

    useEffect(() => {
        if (initialized) {
            ReactGA.pageview(location.pathname + location.search);
        }
    }, [initialized, location])
}
