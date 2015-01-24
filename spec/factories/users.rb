# == Schema Information
#
# Table name: users
#
#  id            :integer          not null, primary key
#  email         :string
#  uid           :string
#  name          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  session_token :string
#  nickname      :string
#  provider      :string           default("facebook")
#  admin         :boolean          default("false")
#

FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    sequence :uid do |n|
      n
    end
    name { Faker::Name.first_name }
    nickname { Faker::Internet.user_name }
    session_token "1234"
  end
end
