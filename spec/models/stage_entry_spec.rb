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

require 'rails_helper'

RSpec.describe StageEntry, :type => :model do
  it { should belong_to(:user) }
  it { should belong_to(:stage) }
end
