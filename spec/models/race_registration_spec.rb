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

  describe '#other_cars' do
    it 'should include the hash of values for creating another car' do
      track = create(:track)
      user1 = create(:user, nickname: "bozo")
      user2 = create(:user)

      race_reg = RaceRegistration.new(user1, track)
      race_reg.save
      race_reg2 = RaceRegistration.new(user2, track)
      race_reg2.save
      expect(race_reg2.other_cars).to match_array([
        { nickname: user1.nickname, id: user1.id, race_id: race_reg.current_race.id }
      ])
    end
  end
end
