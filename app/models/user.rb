# == Schema Information
#
# Table name: users
#
#  id            :integer          not null, primary key
#  email         :string
#  uid           :string
#  name          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  session_token :string
#  nickname      :string
#

class User < ActiveRecord::Base
  validates :session_token, :nickname, presence: true
  has_many :authored_tracks, class_name: "Track", foreign_key: :author_id

  before_validation do
    self.session_token ||= SecureRandom.hex
  end

  def self.find_or_create_from_auth_hash(auth_hash)
    u = User.find_by(uid: auth_hash.fetch(:uid))
    return u if u
    u = User.create!(
      uid: auth_hash.fetch(:uid),
      email: auth_hash.fetch(:info).fetch(:email),
      name: auth_hash.fetch(:info).fetch(:name),
      nickname: auth_hash.fetch(:info).fetch(:nickname)
    )
  end

  def reset_session_token!
    self.session_token = SecureRandom.hex
    save!
    session_token
  end
end
