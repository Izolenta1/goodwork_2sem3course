import { useEffect } from "react";

export default function useClickOutside(ref, callback, type) {
    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener(type, handleClick)
        return () => {
            document.removeEventListener(type, handleClick)
        }
    })
}