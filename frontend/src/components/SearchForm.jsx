import {useSelector, useDispatch} from 'react-redux'
import {getSearchedMedia} from '../features/tmdb/tmdbSlice'
import {useState} from 'react'

function SearchForm() {
    const dispatch = useDispatch()
    const {searchedMedia} = useSelector((state) => state.tmdb)
    const [searchString, setSearchString] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(getSearchedMedia(searchString))
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    id="search"
                    name="search"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </>
    )
}

export default SearchForm