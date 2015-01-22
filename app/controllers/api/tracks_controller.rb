module Api
  class TracksController < ApplicationController
    before_action :require_admin!, only: [:create, :update]

    def index
      @tracks = Track.all
      render json: @tracks
    end

    def show
      @track = Track.find(params[:id])
      render json: @track
    end

    def create
      @track = current_user.authored_tracks.new(track_params)
      if @track.save
        render json: @track
      else
        render json: @track.errors.full_messages, status: 422
      end
    end

    def update
      @track = Track.find(params[:id])

      if @track.update(track_params)
        render json: @track
      else
        render json: @track.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def track_params
      params.require(:track).permit(:title, :content, :about)
    end
  end
end
