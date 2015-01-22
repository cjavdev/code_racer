# == Schema Information
#
# Table name: races
#
#  id         :integer          not null, primary key
#  track_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Race, :type => :model do
  it { should have_many(:race_entries) }
  it { should belong_to(:track) }

  describe '#open_for_registration?' do
    it 'should be open during the 15 seconds after creation' do
      race = create(:race)
      expect(race).to be_open_for_registration
    end

    it 'should close after 16 seconds' do
      race = create(:race, created_at: 16.seconds.ago)
      expect(race).not_to be_open_for_registration
    end
  end

  describe '#join' do
    it 'should add an entry for the user' do
      user = create(:user)
      race = create(:race)

      expect {
        race.join(user)
      }.to change(RaceEntry, :count).by(1)
    end
  end

  describe '#start_at' do
    it 'returns 15 seconds after created_at' do
      t = Time.now
      race = create(:race, created_at: t)
      expect(race.start_at).to eq(t + 15.seconds)
    end
  end
end
