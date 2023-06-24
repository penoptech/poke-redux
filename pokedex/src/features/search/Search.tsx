import { useRef, useEffect, useState, ChangeEvent } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { fetchAllPokemonAsync, searchByName } from './searchSlice';


const Search = () => {
    const dispatch = useAppDispatch();
    const expandableRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClickOutside = (event: MouseEvent) => {
        if (expandableRef.current && !expandableRef.current.contains(event.target as Node)) {
            setIsExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        dispatch(fetchAllPokemonAsync());
    }, [dispatch]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchByName(e.target.value));
    };

    return (
        <div>
            <div className='container ms-2 mt-2'>
                <input placeholder='Search...' type="text" onChange={(e) => handleSearch(e)} />
            </div>
        </div>
    )
};

export default Search;