module Api
  class RaceEntriesController < ApplicationController
    def create
      @registration = RaceRegistration.new(current_user, current_track)

      if @registration.save
        @registration.notify!
        render json: @registration
      else
        render json: @registration.errors, status: 422
      end
    end

    private

    def current_track
      Track.find(params[:track_id])
    end
  end
end
