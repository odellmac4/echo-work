class Api::V1::PostsController < ApplicationController
  def index
    posts = Post.includes(:job).all
    render json: posts.as_json(include: :job), status: :ok
  end
end
