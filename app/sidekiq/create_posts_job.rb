class CreatePostsJob
  include Sidekiq::Job

  def perform(job_id)
    job = Job.find(job_id)

    
  end
end
