import SearchForm from '../components/SearchForm'
import {useSelector} from 'react-redux'


function SearchListPage() {
    const {searchedMedia} = useSelector((state) => state.tmdb)
    return (
        <>  
            <SearchForm />
            search list page
            {JSON.stringify(searchedMedia)}
        </>
    )
}

export default SearchListPage