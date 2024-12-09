class LoginController < ApplicationController
  def index
    render "/login"
  end

  def user_login
    user = User.find_by(email: user_params[:email])
    if user && user.authenticate(user_params[:password])
      session[:user_id] = user.id
      cookies[:username] = {
        value: user.username,
        expires: 1.week.from_now
      }
      redirect_to "/home"
    else
      render "/login", status: 422
    end
  end

  private
  def user_params
    params.permit(:email, :password)
  end
end