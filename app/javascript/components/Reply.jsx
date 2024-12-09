import React from "react";
import ReactDOM from "react-dom/client";
import axios from 'axios';

export default function Reply(props) {
  const replies = props.replies
  return replies.map((reply, index) =>
    <div>
      <div className="mt-2 pl-4 border-l-2 border-gray-600" key={index}>
        <div className="text-gray-300 mt-2">
          <div className="font-semibold">{reply.user_id}</div>
          <p>{reply.reply_text}</p>
        </div>
      </div>
    </div>
  )
}

const replyContainer = document.getElementById("reply-container")
if (replyContainer) {
  const replyRoot = ReactDOM.createRoot(replyContainer);
  replyRoot.render(<Reply/>);
}