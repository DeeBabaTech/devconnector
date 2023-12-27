import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../store";
import { Link, useParams } from "react-router-dom";
import PostItem from "../posts/PostItem";
import Spinner from "../layout/Spinner";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Alert from "../layout/alert";

function Post() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);
  const { post, loading } = useSelector((state) => {
    return state.post;
  });
  return loading || post === null ? (
    <Spinner />
  ) : (
    <div className='container'>
      <Alert />
      <Link to='/posts' className='btn'>
        Back to posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm id={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => {
          return (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Post;
