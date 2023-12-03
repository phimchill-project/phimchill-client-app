import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import movieApi from "../../../api/movie/exportMovieApi";
import {useDebounce} from "../../../hook";
import tvshowApi from "../../../api/tvshow/exportMovieApi";
import FilmSwiper from "../../../components/filmSwiper";

function Search(){
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const qValue = params.get('q');

    const [searchValue, setSearchValue] = useState('');

    const [movies, setMovies] = useState();
    const [tvSeries, setTvSeries] = useState();

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        setSearchValue(qValue || '');
    }, [qValue]);

    useEffect(() => {
        if (!debouncedValue.trim())
            return;

        const findMovies = async () => {
            const data = await movieApi.findMoviesByName(debouncedValue);
            setMovies(data?.data);
        };

        const findManyTvSeries = async () => {
            const data = await tvshowApi.findManyTvSeries(debouncedValue);
            console.log(data)
            setTvSeries(data?.data);
        };

        findMovies();
        findManyTvSeries();
    }, [debouncedValue]);

    return (
        <div className="main-content" >
            {movies != null ? <FilmSwiper flims={movies} name={"Movies"} /> : ""}
            {tvSeries != null ? <FilmSwiper flims={tvSeries} name={"TvSeries"} /> : ""}
        </div>
    )
}

export default Search;