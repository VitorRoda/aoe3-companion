import React from 'react'
import { useEffect } from 'react'
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../config/firebaseConfig';
import { useState } from 'react';

export const ImgFS = ({ path, alt, ...props }) => {
    const [urlFS, setUrlFS] = useState('')
    useEffect(() => {
        const refImg = ref(storage, path)

        getDownloadURL(refImg).then((url) => {
            setUrlFS(url)
        })
    }, [path])

    return (
        <img
            {...props}
            loading='lazy'
            src={urlFS}
            alt={alt}
        />
    )
}
