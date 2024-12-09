class Api::V1::PostsController < ApplicationController
  def show
    post = PostSerializer.new(Post.find(params[:id]))
    render json: post.as_json, status: :ok
  end
end