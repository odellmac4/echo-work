class Api::V1::CommentsController < ApplicationController
  def create
    Comment.create!(comment_params)
  end

  private
  def comment_params
    params.permit(:comment_text, :post_id).merge({user_id: session[:user_id]})
  end
end