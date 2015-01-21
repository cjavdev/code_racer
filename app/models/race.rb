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
  belongs_to :track
  has_many :race_entries
end
