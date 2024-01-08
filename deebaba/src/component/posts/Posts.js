import React, { Fragment, useEffect } from "react";
import { getPosts } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PostItem from "./PostItem";
import Alert from "../layout/alert";
import PostForm from "./PostForm";

function Posts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const { posts, loading } = useSelector((state) => {
    return state.post;
  });
  return loading ? (
    <div className='my-spinner'>
      <Spinner />
    </div>
  ) : (
    <div className='container'>
      <Fragment>
        <Alert />
        <h1 className='large text-primary'>Posts</h1>
        <p className='lead'>
          <FontAwesomeIcon icon={faUser} /> Welcome to the community
        </p>
        <PostForm />
        <div className='posts'>
          {posts.map((post) => {
            return <PostItem key={post._id} post={post} />;
          })}
        </div>
      </Fragment>
    </div>
  );
}

export default Posts;
