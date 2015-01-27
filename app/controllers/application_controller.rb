class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :no_cheaters!

  helper_method :current_user

  def no_cheaters!
    if logged_in? && current_user.cheater
      redirect_to root_url
    end
  end

  def require_admin!
    if !logged_in? || !current_user.admin
      render json: { message: "Unauthorized request" }, status: 401
    end
  end

  def require_user!
    redirect_to "/welcome" unless logged_in?
  end

  def login(user)
    session[:token] = user.reset_session_token!
  end

  def logged_in?
    !!current_user
  end

  def current_user
    @_current_user ||= User.find_by(session_token: session[:token])
  end
end
