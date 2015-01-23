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

class Track < ActiveRecord::Base
  belongs_to :author, class_name: "User"
  has_many :races
  has_many :race_entries, through: :races

  def current_race
    races.open_for_registration.first
  end

  def top_entry
    race_entries
      .where.not(wpm: nil)
      .order(wpm: :desc)
      .first
  end
end
