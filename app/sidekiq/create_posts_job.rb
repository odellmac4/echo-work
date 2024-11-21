class CreatePostsJob
  include Sidekiq::Job

  def perform(job_id)
    return unless job_id
    post = Post.find_or_create_by(job_id: job_id)
    Rails.logger.info("Post for Job #{job_id} has been #{post.persisted? ? 'found' : 'created'}")
  end
end
