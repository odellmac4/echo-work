import React from "react";
import ReactDOM from "react-dom/client";

export default function Job({ post }) {
  const job = post.job
  return (    
    <div>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold text-purple-500">{job.job_title}</div>
        <div className="text-1xl font-semibold text-purple-500">{job.company_name}</div>
      </div>
      <p className="text-gray-400">{job.job_description}</p>
      <p className="text-gray-500 text-sm">Location: {job.location}</p>
      <p className="text-gray-500 text-sm">Qualifications: {job.qualifications}</p>
      <p className="text-gray-500 text-sm">Salary: {job.salary}</p>
      <p className="text-gray-500 text-sm">Full Time?: {job.full_time.toString()}</p>
      <p className="text-gray-500 text-sm">Contract?: {job.contract.toString()}</p>
      <p className="text-gray-500 text-sm">Date Posted: {job.date_posted}</p>
      <p className="text-gray-500 text-sm">Industry: {job.industry}</p>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-green-500 hover:text-green-700">Apply Now</a>
      </div>
    </div>
  )
}

const jobContainer = document.getElementById("job-container")
if (jobContainer) {
  const jobRoot = ReactDOM.createRoot(jobContainer);
  jobRoot.render(<Job/>);
}