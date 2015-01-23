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

FactoryGirl.define do
  factory :race_entry do
    race_id 1
    user
    wpm 1.5
  end
end
