import React, { useState } from "react";
import { addComment } from "../../store";
import { useDispatch } from "react-redux";

function CommentForm({ id }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  return (
    <div className='post-form'>
      <div className='bg-primary'>
        <h3>Leave a Comment...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addComment({ id, text }));
          setText("");
        }}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
}

export default CommentForm;
