import {useDispatch} from 'react-redux'
import {getSearchedMedia} from '../features/tmdb/tmdbSlice'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

function SearchForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchString, setSearchString] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(getSearchedMedia(searchString))
        navigate('/searchpage')
    }

    return (
        <div className="search-panel-container">
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
        </div>
    )
}

export default SearchForm