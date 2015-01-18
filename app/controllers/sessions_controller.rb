class SessionsController < ApplicationController
  def create
    @user = User.find_or_create_from_auth_hash(auth_hash)
    redirect_to welcome_path
  end

  def auth_hash
    request.env['omniauth.auth']
  end
end
