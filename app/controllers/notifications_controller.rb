class NotificationsController < ApplicationController
  before_action :require_user!

  def show
  end

  def destroy
    current_user.gets_notifications = false
    current_user.save!
    redirect_to root_url
  end
end
