# == Schema Information
#
# Table name: stages
#
#  id         :integer          not null, primary key
#  owner_id   :integer
#  token      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :stage do
    owner_id 1
token "MyString"
  end

end
