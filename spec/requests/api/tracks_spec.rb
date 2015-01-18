require 'rails_helper'

RSpec.describe 'Tracks API' do
  describe 'GET /api/tracks' do
    it 'returns all the tracks' do
      create(:track, title: "Track 1")
      create(:track, title: "Track 2")

      get "/api/tracks", {}, { "Accept" => "application/json" }

      expect(response.status).to eq 200

      body = JSON.parse(response.body)
      track_titles = body.map { |t| t["title"] }

      expect(track_titles).to match_array(["Track 1", "Track 2"])
    end
  end
end
