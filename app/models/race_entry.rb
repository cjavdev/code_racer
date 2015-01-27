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
  validate :no_cheating_wpm
  belongs_to :race
  belongs_to :user

  def no_cheating_wpm
    return true if wpm.nil? || wpm.between?(1, 255)
    if wpm > 225
      user.cheater = true
      user.session_token = SecureRandom.hex
      user.save!
      EventMailer.cheater(user).deliver_later
      errors.add(:wpm, 'over maximum wpm')
    end
  end

  def nickname
    user.nickname
  end
end
