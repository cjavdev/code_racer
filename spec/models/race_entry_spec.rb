# == Schema Information
#
# Table name: race_entries
#
#  id         :integer          not null, primary key
#  race_id    :integer          not null
#  user_id    :integer          not null
#  wpm        :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe RaceEntry, :type => :model do
  it { should belong_to(:user) }
  it { should belong_to(:race) }
  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:race) }

  before(:each) do
    ActionMailer::Base.delivery_method = :test
    ActionMailer::Base.perform_deliveries = true
    ActionMailer::Base.deliveries = []
  end

  after(:each) do
    ActionMailer::Base.deliveries.clear
  end


  describe '#no_cheating_wpm' do
    it 'should do nothing if the wpm is cool' do
      race_entry = build(:race_entry, wpm: 200)

      expect(race_entry).to be_valid
      expect(ActionMailer::Base.deliveries.count).to eq(0)
    end

    it 'notifies the cheater that they got busted' do
      race_entry = build(:race_entry, wpm: 256)

      expect(race_entry).not_to be_valid
      expect(ActionMailer::Base.deliveries.count).to eq(1)
      expect(ActionMailer::Base.deliveries.first.to)
        .to eq([race_entry.user.email])
    end
  end
end
