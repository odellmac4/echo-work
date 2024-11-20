class Api::V1::JobsController < ApplicationController
  def import
    service = JobsService.new
    jobs = params[:job_ids].map do |job_id|
      job_data = service.get_code_signal_job(job_id)
      job = service.process_and_save(job_data)
      CreatePostsJob.perform_async(job.id)
    end

    if jobs.present?
      render json: jobs.as_json, status: :created
    else
      render json: { error: 'Failed to import jobs' }, status: :unprocessable_entity
    end
  end
end