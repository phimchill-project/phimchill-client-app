import { getAllCommentsByMovieId, postCommentMovie, postSubCommet, getAllSubCommentsByCommentId, likeMovieComment, unLikeMovieComment, likeMovieSubComment, unLikeMovieSubComment } from "./commentApi";

const commentApi = {
      getAllCommentsByMovieId,
      postCommentMovie,
      postSubCommet,
      getAllSubCommentsByCommentId,
      likeMovieComment,
      unLikeMovieComment,
      likeMovieSubComment,
      unLikeMovieSubComment
}

export default commentApi;

// export default exportCommentApi