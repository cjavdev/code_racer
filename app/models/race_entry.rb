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

class RaceEntry < ActiveRecord::Base
  validates :user, :race, presence: true
  validates :user, uniqueness: { scope: :race }
  belongs_to :race
  belongs_to :user

  def nickname
    user.nickname
  end
end
