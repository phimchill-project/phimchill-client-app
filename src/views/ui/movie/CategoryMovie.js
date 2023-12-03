import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ShowMovieList from '../../../components/common/ShowMovieList'
import categoryApi from "../../../api/category/exportCategoryApi";

function CategoryMovie() {
  const { id } = useParams();  
  const [list, setList] = useState(null);
  const fetchMoviesByCategoryId = async () => {
    let result = await categoryApi.getMoviesByCategoryId(id);
    if (result == null) {
      return;
    }
    setList(result);
  }
  console.log(list);
  useEffect(() => {
    setList(null);
    fetchMoviesByCategoryId();
  }, [id]);
  return (
    <div>
      {list != null ? <ShowMovieList movieList={list} /> : ""}
    </div>
  )
}

export default CategoryMovie