import axios from 'axios'

const BASE_URL = "https://api.themoviedb.org/3/"
const API_KEY = "?api_key=1875d71dd67886cbbc594f365f9bfed7"

const SEARCH_QUERY = " "

const TRENDING_QUERY = "trending/all/week"

const getTrending = async () => {
    
    const response = await axios.get(`${BASE_URL}${TRENDING_QUERY}${API_KEY}`)

    return response.data.results
}

const TMDBservice = {
    getTrending,
}

export default TMDBservice