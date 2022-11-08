import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import { fixPath } from '../utils/fixPath'

export const ImgFS = ({ path, alt, lowerCase, ...props }) => {
    const [urlFS, setUrlFS] = useState('')
    
    useEffect(() => {
        const { REACT_APP_DOMAIN_STORAGE: domain, REACT_APP_STORAGE_BUCKET: bucket } = process.env
        const uri = encodeURIComponent(fixPath(path, lowerCase))
        const url = `${domain}${bucket}/o/${uri}?alt=media`
        setUrlFS(url)
    }, [path, lowerCase])

    return (
        <img
            {...props}
            loading='lazy'
            src={urlFS}
            alt={alt}
        />
    )
}
