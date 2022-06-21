import axios from 'axios'

const API_KEY = "?api_key=1875d71dd67886cbbc594f365f9bfed7"

const BASE_URL = "https://api.themoviedb.org/3/"
const IMAGE_URL = "https://image.tmdb.org/t/p/w500"



const SEARCH = ""
const TRENDING_MOVIE = "trending/movie/week"
const TRENDING_TV = "trending/tv/week"


const getTrendingMovie = async () => {
    
    const response = await axios.get(`${BASE_URL}${TRENDING_MOVIE}${API_KEY}`)

    return response.data.results
}

const getTrendingTv = async () => {
    const response = await axios.get(`${BASE_URL}${TRENDING_TV}${API_KEY}`)

    return response.data.results
}


const TMDBservice = {
    getTrendingMovie,
    getTrendingTv,
}

export default TMDBservice