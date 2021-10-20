import React,{ useState, useEffect, Fragment} from 'react';
import { commentsAdminCommunicator } from '../../Communicators/CommentsAdminCommunicator/CommentsAdminCommunicator';
import { formateDate } from "../../Utils/date-time";
import Spinner from "../Spinner/Spinner";

import classes from "./Comments.module.css";

const Comments = () => {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(true);

  const fetchComments = async () => {
    const response = await commentsAdminCommunicator.getComments();
    setComments(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [allowed]);

  const allowDissalow = async (param, id) => {
    if(param === "allow") {
      if(!window.confirm("You are about to allow this comment. Are you sure?")) {
        return false;
      } else {
        await commentsAdminCommunicator.allowDissallowComments(param, id);
        setAllowed(!allowed);
      }
    } else {
      if(!window.confirm("You are about to disallow this comment. Are you sure?")) {
        return false;
      } else {
        await commentsAdminCommunicator.allowDissallowComments(param, id);
        setAllowed(!allowed);
      }
    }
  };

  return (
    <Fragment>
      <section className="main-section">
        {loading && <Spinner />}
          {comments.length > 0 && comments.map(item => 
            <article key={item.id} className={classes["comments-aticle"]}>
                <div>
                  <p>{formateDate(item.comment_created)} {item.comment_author}</p>
                  <p>{item.comment_text}</p>
                  <p><button onClick={() => allowDissalow("allow", item.id)}>ALLOW</button> | <button onClick={() => allowDissalow("disallow", item.id)}>DISSALOW</button></p>
                </div>
            </article>
          )}
          {comments < 1 && <div className={classes["comments-aticle"]}>
            <p>No comments to allow or dissallow!</p>
          </div> }
      </section>
    </Fragment>
  );
};

export default Comments;
