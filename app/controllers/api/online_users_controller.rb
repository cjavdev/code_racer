require 'set'

module Api
  class OnlineUsersController < ApplicationController
    before_action :require_user!
    before_action :get_users
    after_action :set_users

    def show
      render json: @users
    end

    def create
      add_user
      Pusher['presence'].trigger('add_user', user_hash)
      render json: @users
    end

    def destroy
      remove_user
      Pusher['presence'].trigger('remove_user', user_hash)
      render json: @users
    end

    private

    def user_hash
      {
        id: current_user.id,
        nickname: current_user.nickname
      }
    end

    def add_user
      @users << user_hash unless @users.include?(user_hash)
    end

    def remove_user
      @users.delete_if { |u| u[:id] == current_user.id }
    end

    def get_users
      @users ||= Rails.cache.read('users') || Set.new
    end

    def set_users
      Rails.cache.write('users', @users.to_a)
    end
  end
end
