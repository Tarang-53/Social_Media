import { MoreVert } from "@mui/icons-material";
import "./post.css";
// import { Users } from "../../dummyData";
import { useEffect, useState } from "react";
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";

export default function Post({post}) {
    // const user = Users.filter(u => u.id === post.userId )[0];
    const [like,setLike] = useState(post.like);
    const [user,setUser] = useState({});
    const [isLiked,setIsLiked] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    function clickHandle() {
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    };

    useEffect(()=>{
        const fatchUser = async () => {
          const res = await axios.get(`users/${post.userId}`);
          setUser(res.data);
        }
        fatchUser();
      },[post.userId])

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img src={user.profilePicture || "/assets/Profile-pics/ragnar_lothbrok.jpg"} alt="ragnar lothbrok" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF + post.img} alt="war scene" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src="/assets/like.png" alt="thumb up" onClick={clickHandle} className="likeIcon" />
                        <img src="/assets/heart.png" alt="red heart" onClick={clickHandle} className="likeIcon" />
                        <span className="postLikeCounter">{post.likes.length} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
