module Api
  class RaceEntriesController < ApplicationController
    def create
      @registration = RaceRegistration.new(current_user, params)

      if @registration.save
        render json: @registration
      else
        render json: @registration.errors, status: 422
      end
    end
  end

  private

  def current_track

  end
end
