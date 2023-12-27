import {
  faThumbsDown,
  faThumbsUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, deletePost, removeLike } from "../../store";

function PostItem({
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions = true,
}) {
  const auth = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              onClick={() => dispatch(addLike(_id))}
              type='button'
              className='btn btn-light'>
              <FontAwesomeIcon icon={faThumbsUp} />
              <span>{likes.length}</span>
            </button>
            <button
              onClick={() => dispatch(removeLike(_id))}
              type='button'
              className='btn btn-light'>
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{" "}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => dispatch(deletePost(_id))}
                type='button'
                className='btn btn-danger'>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default PostItem;
