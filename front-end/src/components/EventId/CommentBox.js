import React, { useState, useRef } from "react";
import cn from "classnames";
import useDynamicHeightField from "../../hooks/useDynamicHeightField";
import "./CommentBox.css";
import { propTypes } from "react-bootstrap/esm/Image";
import soccerIcon from './soccerIcon.png'
import axios from 'axios';

//Controls height of box when first opened
const INITIAL_HEIGHT = 46;


export default function CommentBox(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  useDynamicHeightField(textRef, commentValue);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  };

  const onChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8001/api/events/${props.eventId}/comments`, { userId: props.user.id, comment: commentValue })
      .then(() => {
        props.setComments(prev => [{ fullName: `${props.user.first_name} ${props.user.last_name}`, user_id: props.user.id, event_id: props.eventId, comment: commentValue }, ...prev])
      })
  };
  return (
    <div className="container">
      <form
        onSubmit={onSubmit}
        ref={containerRef}
        className={cn("comment-box", {
          expanded: isExpanded,
          collapsed: !isExpanded,
          modified: commentValue.length > 0
        })}
        style={{
          minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
        }}
      >
        <div className="header">
          <div className="user">
            <img
              src={soccerIcon}
              alt="User avatar"
            />
            <span> {props.user.first_name} {props.user.last_name}</span>
          </div>
        </div>
        <label id="label" htmlFor="comment">What are your thoughts?</label>
        <textarea
          ref={textRef}
          onClick={onExpand}
          onFocus={onExpand}
          onChange={onChange}
          className="comment-field"
          placeholder="What are your thoughts?"
          value={commentValue}
          name="comment"
          id="comment"
        />
        <div className="actions">
          <button type="button" className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" disabled={commentValue.length < 1}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
