# == Schema Information
#
# Table name: stage_entries
#
#  id         :integer          not null, primary key
#  stage_id   :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :stage_entry do
    stage_id 1
user_id 1
  end

end
