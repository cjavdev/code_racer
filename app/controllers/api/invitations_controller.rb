module Api
  class InvitationsController < ApplicationController
    def create
      Pusher['presence'].trigger('invite', params)
      render json: params
    end
  end
end
