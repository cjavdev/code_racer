class SessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: [:destroy]

  def create
    @user = User.find_or_create_from_auth_hash(auth_hash)
    login(@user)
    redirect_to root_path
  end

  def destroy
    current_user.reset_session_token!
    session[:token] = nil
    redirect_to root_url
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end
end
