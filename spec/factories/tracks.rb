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

FactoryGirl.define do
  factory :track do
    content "MyText"
    title "MyString"
    about "MyString"
    association :author, factory: :user
  end
end
