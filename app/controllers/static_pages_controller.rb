class StaticPagesController < ApplicationController
  before_action :require_user!, only: [:root]

  def root; end
  def welcome; end
end
