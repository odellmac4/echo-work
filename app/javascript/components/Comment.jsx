import React from "react";
import ReactDOM from "react-dom/client";

class Comment extends React.Component {


  render(){
    return(
      <div>
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="chat-header">
            Anakin
          </div>
          <div className="chat-bubble">I hate you!</div>
        </div>
      </div>
    )
  }
}

const commentContainer = document.getElementById("comment-container")
if (commentContainer) {
  const commentRoot = ReactDOM.createRoot(commentContainer);
  commentRoot.render(<Comment/>);
}