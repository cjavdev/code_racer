require 'rails_helper'

RSpec.describe Instigator do
  let(:track) { create(:track) }
  let(:race) { create(:race, track: track) }
  let!(:race_entry) { create(:race_entry, race: race, wpm: 10) }

  context 'when there are no existing races for the current track' do
    it 'notifies the current user that they are the new champ' do
      instigator = Instigator.new(race_entry)

      expect(instigator).to receive(:notify_new_champ!)
      instigator.instigate!
    end
  end

  context 'when the new wpm is higher than the existing top wpm for a track' do
    it 'notifies the current user they are the new champ' do
      race2 = create(:race, track: track)
      race_entry2 = create(:race_entry, race: race2, wpm: 11)

      instigator = Instigator.new(race_entry2)

      expect(instigator).to receive(:notify_new_champ!)
      instigator.instigate!
    end

    it 'notifies the old champ that their crown has been stolen' do
       race2 = create(:race, track: track)
      race_entry2 = create(:race_entry, race: race2, wpm: 11)

      instigator = Instigator.new(race_entry2)

      expect(instigator).to receive(:notify_old_champ!)
      instigator.instigate!
    end

    it 'does nothing if the current user has a wpm less than the current champ' do
      race2 = create(:race, track: track)
      race_entry2 = create(:race_entry, race: race2, wpm: 9)

      instigator = Instigator.new(race_entry2)
      expect(instigator).not_to receive(:notify_new_champ!)
      instigator.instigate!
    end
  end
end
