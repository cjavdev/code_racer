# == Schema Information
#
# Table name: races
#
#  id         :integer          not null, primary key
#  track_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Race, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
