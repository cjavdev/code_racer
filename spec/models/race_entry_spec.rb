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

require 'rails_helper'

RSpec.describe RaceEntry, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
