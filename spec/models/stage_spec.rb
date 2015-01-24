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

require 'rails_helper'

RSpec.describe Stage, :type => :model do
  it { should belong_to(:owner) }
  it { should have_many(:stage_entries) }
  it { should have_many(:racers) }
end
