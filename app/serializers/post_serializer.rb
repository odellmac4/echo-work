class PostSerializer
  include JSONAPI::Serializer
  attributes :job_id, :post_text, :likes, :dislikes, :id, :job, :comments, :replies
end