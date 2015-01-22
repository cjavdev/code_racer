module Api
  class WpmsController < ApplicationController
    def create
      Pusher["race_#{ params[:race_id] }"].trigger('update_speed', {
        id: params[:id],
        wpm: params[:wpm],
        percent_complete: params[:percent_complete]
      })

      render json: {}
    end
  end
end
