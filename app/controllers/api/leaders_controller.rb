module Api
  class LeadersController < ApplicationController
    def index
      @leading_entries = current_track.leading_entries
      render :index
    end

    private

    def current_track
      @_current_track ||= Track.find(params[:track_id])
    end
  end
end
