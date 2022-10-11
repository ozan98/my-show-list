import axios from 'axios'

// const API_KEY = '?api_key=1875d71dd67886cbbc594f365f9bfed7'
const API_KEY = process.env.REACT_APP_TMDB_KEY

const BASE_URL = 'https://api.themoviedb.org/3/'
const SEARCH_BASE_URL = 'https://api.themoviedb.org/3/search/multi'

const SEARCH = "&query="
const TRENDING_MOVIE = 'trending/movie/week'
const TRENDING_TV = 'trending/tv/week'

const BASE_CREDIT_MOVIE = "/movie"
const BASE_CREDIT_TV = "/tv"
const CREDIT = "/credits"



const getTrendingMovie = async () => {
    
    const response = await axios.get(`${BASE_URL}${TRENDING_MOVIE}${API_KEY}`)

    return response.data.results
}

const getTrendingTv = async () => {
    const response = await axios.get(`${BASE_URL}${TRENDING_TV}${API_KEY}`)

    return response.data.results
}

const getSearchedMedia = async (searchString) => {
    const response = await axios.get(`${SEARCH_BASE_URL}${API_KEY}${SEARCH}${searchString}`)
    
    return response.data.results
}

const getCreditInfo = async (media) => {
    if(media.title) {
        const response = await axios.get(`${BASE_URL}${BASE_CREDIT_MOVIE}/${media.id}${CREDIT}${API_KEY}`)
        return response.data
    }else {
        const response = await axios.get(`${BASE_URL}${BASE_CREDIT_TV}/${media.id}${CREDIT}${API_KEY}`)
        return response.data
    }

}


const TMDBservice = {
    getTrendingMovie,
    getTrendingTv,
    getSearchedMedia,
    getCreditInfo,
}

export default TMDBservice