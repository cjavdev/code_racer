require 'rails_helper'

RSpec.describe User, :type => :model do
  it { should validate_presence_of(:nickname) }

  it 'should set the session_token before validation' do
    user = User.new
    user.valid?
    expect(user.session_token).not_to be_nil
  end

  describe '::find_or_create_from_auth_hash' do
    it 'finds a user if one exists with the same uid' do
      user = create(:user, uid: 12345)
      found_user = User.find_or_create_from_auth_hash({ uid: 12345 })
      expect(user).to eq(found_user)
    end

    it 'creates a new user if one does not exist with that uid' do
      expect {
        User.find_or_create_from_auth_hash(fake_auth_hash)
      }.to change(User, :count).by(1)
    end
  end

  describe '#reset_session_token!' do
    it 'resets the session token and returns it' do
      u = create(:user)
      old_token = u.session_token
      expect(u.reset_session_token!).not_to eq(old_token)
    end
  end
end
