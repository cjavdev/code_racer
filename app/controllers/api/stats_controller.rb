module Api
  class StatsController < ApplicationController
    def index
      @stats = current_user.stats
      render json: @stats
    end
  end
end
