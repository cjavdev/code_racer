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

    def update
      @entry = current_user.race_entries.find_by(race_id: params[:race_id])
      @entry.wpm = params[:wpm]

      if @entry.save
        Instigator.new(@entry).instigate!
      end

      # if this wpm is the top wpm, and the current user is not the
      # top dog, notify the current user of taking the lead,
      # notify the number 2 they were passed.
      render json: @entry
    end

    private

    def current_track
      Track.find(params[:track_id])
    end
  end
end
