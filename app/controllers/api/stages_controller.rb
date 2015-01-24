module Api
  class StagesController < ApplicationController
    def create
      @stage = current_user.stages.new

      if @stage.save
        render json: @stage
      else
        render json: @stage.errors.full_messages, status: 422
      end
    end
  end
end
