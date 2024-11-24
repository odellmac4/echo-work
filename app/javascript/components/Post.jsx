import React from "react";
import ReactDOM from "react-dom/client";

const Post = () => {
  return (
    <div>
      <div className="p-4 space-y-6">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-semibold text-purple-500">Software Engineer</div>
            <div className="text-xl text-green-500">Post Show Page Example</div>
          </div>

          <p className="text-gray-400">We are looking for a talented Software Engineer to join our growing team. You will be responsible for developing scalable web applications...</p>

          <p className="text-gray-500 text-sm">Location: San Francisco, CA</p>

          <div className="flex items-center space-x-4">
            <button className="text-blue-500 hover:text-blue-700">Show Comments</button>
            <a href="#" className="text-green-500 hover:text-green-700">Apply Now</a>
          </div>

          <div className="mt-4 space-y-4">
            <div className="bg-gray-700 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <div className="font-semibold">John Doe</div>
                <div className="text-gray-400 text-sm">2 hours ago</div>
              </div>
              <p>This is a great job opportunity!</p>

              <div className="mt-2 pl-4 border-l-2 border-gray-600">
                <div className="text-gray-300 mt-2">
                  <div className="font-semibold">Jane Smith</div>
                  <p>Yes, the company is amazing!</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <div className="font-semibold">Sarah Lee</div>
                <div className="text-gray-400 text-sm">5 hours ago</div>
              </div>
              <p>Is remote work an option?</p>
            </div>

            <div className="mt-4">
              <textarea placeholder="Add a comment..." className="w-full p-3 bg-gray-700 rounded-md text-white placeholder-gray-400"></textarea>
              <button className="mt-2 bg-green-500 hover:bg-green-700 text-white rounded-md px-4 py-2 active:bg-purple-500">
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const postContainer = document.getElementById("post-container");
console.log(postContainer);
if (postContainer) {
  const postRoot = ReactDOM.createRoot(postContainer);
  postRoot.render(<Post />);
}