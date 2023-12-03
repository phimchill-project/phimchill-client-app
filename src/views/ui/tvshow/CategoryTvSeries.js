import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ShowTvSeriesList from '../../../components/common/ShowTvSeriesList'
import categoryApi from "../../../api/category/exportCategoryApi";

function CategoryTvSeries() {
    const { id } = useParams();
    const [list, setList] = useState(null);
    const fetchTvSeriesByCategoryId = async () => {
        let result = await categoryApi.getTvSeriesByCategoryId(id);
        console.log(result);
        if(result == null){
            setList([]);
            return;
        }
        setList(result);
    }
    useEffect(() => {
        setList(null);
        fetchTvSeriesByCategoryId();
    },[id]);
    return (
        <div>
            {list != null ? <ShowTvSeriesList tvSeriesList={list} /> : ""}
        </div>
    )
}

export default CategoryTvSeries