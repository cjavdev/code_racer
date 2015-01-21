require 'rails_helper'

RSpec.describe RaceRegistration do
  describe '#save' do
    it 'creates a race if current track has 0 races open for entries' do
      track = create(:track)
      user = create(:user)
      race_reg = RaceRegistration.new(user, track)
      expect {
        race_reg.save
      }.to change(Race, :count).by(1)
    end
  end
end
