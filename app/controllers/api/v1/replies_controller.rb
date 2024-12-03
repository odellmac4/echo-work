class Api::V1::RepliesController < ApplicationController
  def index
    replies = Comment.find(params[:comment_id]).replies
    render json: {replies: replies}, status: :ok
  end
end