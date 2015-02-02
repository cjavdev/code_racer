module Api
  class RaceEntriesController < ApplicationController
    def create
      @registration = RaceRegistration.new(current_user, current_track)
      @registration.save
      render json: @registration
    end

    def update
      @entry = current_user.race_entries.find_by(race_id: params[:race_id])
      @entry.wpm = params[:wpm]

      if @entry.save
        Instigator.new(@entry).instigate!
      end

      render json: @entry
    end

    private

    def current_track
      Track.includes(races: { race_entries: :user }).find(params[:track_id])
    end
  end
end
