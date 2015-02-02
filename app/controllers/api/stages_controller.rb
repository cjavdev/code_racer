module Api
  class StagesController < ApplicationController
    def create
      @stage = current_user.stages.new

      if @stage.save
        if current_user.guest?
          @stage.racer_array << current_user
        else
          @stage.racers << current_user
        end
        render :show
      else
        render json: @stage.errors.full_messages, status: 422
      end
    end

    def show
      @stage = Stage.find_by(token: params[:id])

      unless @stage.racers.include?(current_user)
        if current_user.guest?
          @stage.racer_array << current_user
        else
          @stage.racers << current_user
        end
      end

      render :show
    end

    private

    def random_track
      Track.random
    end
  end
end
