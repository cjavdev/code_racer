# == Schema Information
#
# Table name: tracks
#
#  id         :integer          not null, primary key
#  content    :text             not null
#  title      :string           not null
#  about      :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Track, :type => :model do
  it { should belong_to :author }
  it { should have_many(:races) }

  describe '#current_race' do
    it 'should be nil if no races for this track are open for registration' do
      track = build(:track)
      allow(track)
        .to receive_message_chain(:races, :open_for_registration)
        .and_return([])
      expect(track.current_race).to be_nil
    end

    it 'should return the first race that is open for registration' do
      track = build(:track)
      create(:race, created_at: 1.day.ago)
      race2 = create(:race)
      create(:race)
      allow(track).to receive(:races).and_return(Race.all)
      expect(track.current_race).to eq(race2)
    end
  end

  describe '#top_entry' do
    it 'returns the fastest wpm race entry for this track' do
      track = create(:track)
      race = create(:race, track: track)
      low_entry = create(:race_entry, race: race, wpm: 1)
      high_entry = create(:race_entry, race: race, wpm: 3)
      mid_entry = create(:race_entry, race: race, wpm: 2)

      expect(track.top_entry).to eq(high_entry)
    end
  end
end
