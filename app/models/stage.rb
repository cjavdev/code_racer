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

class Stage < ActiveRecord::Base
  belongs_to :owner, class_name: 'User'
  has_many :stage_entries
  has_many :racers, through: :stage_entries, source: :user

  before_validation do
    self.token ||= SecureRandom.hex(6)
  end

  def racer_array
    @racer_array ||= racers.to_a
  end
end
