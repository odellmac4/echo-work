import React, {useState} from "react";
import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-center space-x-4">
      <div className="likes-container flex items-center">
        {liked ? ( 
          <span onClick={() => setLiked(!liked)} className="mr-2"><ThumbUpIcon/></span>
        ) : (
          <span onClick={() => setLiked(!liked)} className="mr-2"><ThumbUpOutlined/></span>
        )}
        <span className="text-gray-500 mr-3">23</span>
      </div>
      <div className="dislike-container flex items-center">
        <ThumbDownOutlinedIcon></ThumbDownOutlinedIcon>
      </div>
    </div>
  )
}

export default LikeButton