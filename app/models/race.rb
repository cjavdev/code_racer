# == Schema Information
#
# Table name: races
#
#  id         :integer          not null, primary key
#  track_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Race < ActiveRecord::Base
  DELAY = 15
  belongs_to :track
  has_many :race_entries
  scope :open_for_registration, -> { where('created_at > ?', DELAY.seconds.ago) }

  def open_for_registration?
    created_at > DELAY.seconds.ago
  end

  def join(user)
    race_entries.create(user: user)
  end

  def start_at
    created_at + DELAY.seconds
  end
end
