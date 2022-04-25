import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga'

export const useGaTracker = () => {
    const location = useLocation()
    const [initialized, setInitialized] = useState()

    useEffect(() => {
        if (!window.location.href.includes('localhost')) {
            ReactGA.initialize('G-NHC98Q0NJ2')
            setInitialized(true)
        }
    }, [])

    useEffect(() => {
        if (initialized) {
            console.log(location)
            ReactGA.pageview(location.pathname + location.search);
        }
    }, [initialized, location])
}
