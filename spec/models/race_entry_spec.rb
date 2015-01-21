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
end
