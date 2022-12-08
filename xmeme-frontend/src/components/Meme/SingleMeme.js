import { Link } from "react-router-dom";
import Like from "../LikeUnlike/Like";

const SingleMeme = ({ meme, deleteMeme, user }) => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <img id="meme-img" width="100%" src={meme.url} alt="meme" />
          <hr />
          <h6 className="card-text">posted by: {meme.name} </h6>
          <h6 className="card-subtitle text-muted">{meme.caption} </h6>

          {user ? (
            <div className="EditDelete">
              <Link
                to={"/edit/" + meme.user+"/"+meme._id}
                className="btn-sm btn-primary mr1"
                id="edit"
              >
                Edit
              </Link>
              <Link
                to="#"
                className="btn-sm btn-danger"
                id="delete"
                onClick={() => deleteMeme(meme._id)}
              >
                Delete
              </Link>
            </div>
          ) : (
            ""
          )}
          <Like memeId={meme._id} userId={meme.likes}/>
          <h4>{meme.likes.length}</h4>
        </div>
      </div>
      <br />
    </div>
  );
};

export default SingleMeme;
