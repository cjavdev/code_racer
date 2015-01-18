class SessionsController < ApplicationController
  def create
    redirect_to welcome_path
  end
end
