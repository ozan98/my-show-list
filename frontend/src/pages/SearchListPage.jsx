import util from '../util/util'
import SearchForm from '../components/SearchForm'
import ShowCard from '../components/ShowCard'
import {useSelector} from 'react-redux'
import { getSearchedMedia } from '../features/tmdb/tmdbSlice'

function SearchListPage() {
    const {searchedMedia} = useSelector((state) => state.tmdb)

    const selectMedia = (id) => {
        console.log(id)
    }

    const getSearchedMedia = () => {
        return searchedMedia.map((media) => {
            return <ShowCard 
                            key={media.id}
                            id={media.id}
                            name={media.title}
                            image={util.getImage(media.poster_path)}
                            score={media.vote_average}
                            releaseDate={media.release_date}
                            overView={media.overview}
                            checkMedia={selectMedia}
                    />
        })
    }

    return (
        <>  
            <SearchForm />
            search list page
            {getSearchedMedia()}
            
        </>
    )
}

export default SearchListPage