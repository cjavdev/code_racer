require 'rails_helper'

RSpec.describe Api::TracksController, :type => :controller do
  describe 'GET index' do
    it 'assigns @tracks' do
      request.accept = "application/json"
      track = create(:track)
      get :index
      expect(assigns(:tracks)).to eq([track])
    end
  end

  describe 'GET show' do
    it 'assigns @track' do
      request.accept = "application/json"
      track = create(:track)
      get :show, id: track.id
      expect(assigns(:track)).to eq(track)
    end
  end
end
