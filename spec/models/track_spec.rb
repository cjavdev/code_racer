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

require 'rails_helper'

RSpec.describe Track, :type => :model do
  it { should belong_to :author }
end
