import { fixPath } from "./fixPath"

const { REACT_APP_DOMAIN_STORAGE: domain, REACT_APP_STORAGE_BUCKET: bucket } = process.env

export function generateStorageUrl(path, lowerCase = false) {
    const uri = encodeURIComponent(fixPath(path, lowerCase))
    const url = `${domain}${bucket}/o/${uri}?alt=media`

    return url
}