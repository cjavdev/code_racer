module Api
  class SettingsController < ApplicationController
    def update
      current_user.update(nickname: params[:nickname])
      render json: { id: current_user.id, nickname: current_user.nickname }
    end
  end
end
