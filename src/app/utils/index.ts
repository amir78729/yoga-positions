import {Position} from "@/app/types";

export const getIdOfYouTubeUrl = (url: string) => {
    return url.split('watch?v=')[1].split('&')[0]
}

export const getYouTubeEmbedSourceFromUrl = (url: string) => {
    return `https://www.youtube.com/embed/${getIdOfYouTubeUrl(url)}`
}

export const getFavoriteYogaPositionIds = (): Position['id'][] => {
    return JSON.parse(localStorage.getItem('fav') ?? '[]')
}

export const addYogaPositionToFavorites = (position: Position): void => {
    const currentLocalStorageContent = getFavoriteYogaPositionIds();
    if (currentLocalStorageContent.includes(position.id)) {
        alert('ALREADY EXISTS!')
        return
    }
    const modifiedList = [...currentLocalStorageContent, position.id]
    localStorage.setItem('fav', JSON.stringify(modifiedList));
}

export const removeYogaPositionFromFavorites = (position: Position): void => {
    const currentLocalStorageContent = getFavoriteYogaPositionIds();
    if (!currentLocalStorageContent.includes(position.id)) {
        alert('NOT EXISTS!')
        return
    }
    const modifiedList = currentLocalStorageContent.filter(id => id !== position.id)
    localStorage.setItem('fav', JSON.stringify(modifiedList));
}

export const isYogaPositionFavorite = (position: Position): boolean => {
    const currentLocalStorageContent = getFavoriteYogaPositionIds();
    return currentLocalStorageContent.includes(position?.id)
}