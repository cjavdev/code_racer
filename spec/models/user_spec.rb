require 'rails_helper'

RSpec.describe User, :type => :model do
  describe '::find_or_create_from_auth_hash' do
    it 'finds a user if one exists with the same uid' do
      user = create(:user, uid: 12345)
      found_user = User.find_or_create_from_auth_hash({ uid: 12345 })
      expect(user).to eq(found_user)
    end

    it 'creates a new user if one does not exist with that uid' do
      expect {
        User.find_or_create_from_auth_hash({
          uid: 10,
          email: "test@example.com",
          name: "Test Name"
        })
      }.to change(User, :count).by(1)
    end
  end
end
