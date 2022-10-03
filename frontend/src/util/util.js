import {movieGenreList, tvGenreList} from './genraData'

const IMAGE_URL = "https://image.tmdb.org/t/p/w500"

const getImage = (imagePath) => {
    return `${IMAGE_URL}${imagePath}`
}

const getGenre = (media, genreId) => {
    if(media.media_type === 'movie') {
        return getGenreHelper(genreId, movieGenreList)
    } else {
        return getGenreHelper(genreId, tvGenreList)
        
    }
    
    
}

const getGenreHelper = (genreId, genreList) => {
    const mediaGenreList = []

    genreId.forEach((id) => {
        genreList.forEach((genre) => {
            if(genre.id === id){
                mediaGenreList.push(genre)
            }
        })
    })

    return {
        mediaGenreList
    }
}

const util = {
    getImage,
    getGenre,
}

export default util