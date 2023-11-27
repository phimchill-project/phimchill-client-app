import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faThumbsUp} from "@fortawesome/free-solid-svg-icons";


const LikeComment = () => {
    return (
        <>
            <div className="d-flex align-items-center me-3" id="like-button">
                <FontAwesomeIcon icon={faThumbsUp} size="lg" style={{height : 25}}/>
            </div>
            <div  className="d-flex align-items-center me-3" id="comment-button">
                <FontAwesomeIcon icon={faCommentDots} size="lg" style={{height : 25, marginLeft : 20}}/>
            </div>
        </>
    )
}