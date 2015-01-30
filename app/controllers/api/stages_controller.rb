module Api
  class StagesController < ApplicationController
    def create
      @stage = current_user.stages.new

      if @stage.save
        @stage.racers << current_user
        render :show
      else
        render json: @stage.errors.full_messages, status: 422
      end
    end

    def show
      @stage = Stage.find_by(token: params[:id])

      unless @stage.racers.include?(current_user)
        @stage.racers << current_user
      end

      render :show
    end

    private

    def random_track
      Track.random
    end
  end
end
