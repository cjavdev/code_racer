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

class StageEntry < ActiveRecord::Base
  validates :user, uniqueness: { scope: :stage }
  belongs_to :user
  belongs_to :stage
end
