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
#

FactoryGirl.define do
  factory :user do
    email "MyString"
    uid "MyString"
    name "MyString"
    nickname "nickname"
    session_token "1234"
  end
end
