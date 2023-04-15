import { useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useLocalStorage("BIBLEAPP_THEME", false)

    useEffect(() => {
        const html = document.documentElement
        if (isDarkMode) return html.classList.add('dark')
        if (!isDarkMode) return html.classList.remove('dark')
    }, [isDarkMode])

    return [isDarkMode, setIsDarkMode] as const
}




export default useDarkMode