import { getAllCommentsByMovieId, postCommentMovie, postSubCommet, getAllSubCommentsByCommentId } from "./commentApi";

const commentApi = {
      getAllCommentsByMovieId,
      postCommentMovie,
      postSubCommet,
      getAllSubCommentsByCommentId
}

export default commentApi;

// export default exportCommentApi