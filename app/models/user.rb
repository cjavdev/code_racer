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
  has_many :race_entries

  before_validation do
    self.session_token ||= SecureRandom.hex
  end

  def self.find_or_create_from_auth_hash(auth_hash, provider)
    u = User.find_by(uid: auth_hash.fetch(:uid), provider: provider)
    return u if u
    if provider == "github"
      u = User.create!(
        uid: auth_hash.fetch(:uid),
        email: auth_hash.fetch(:info).fetch(:email),
        name: auth_hash.fetch(:info).fetch(:name),
        nickname: auth_hash.fetch(:info).fetch(:nickname)
      )
    else
      u = User.create!(
        uid: auth_hash.fetch(:uid),
        email: auth_hash.fetch(:info).fetch(:email),
        name: auth_hash.fetch(:info).fetch(:name),
        nickname: auth_hash.fetch(:info).fetch(:first_name)
      )
    end
  end

  def reset_session_token!
    self.session_token = SecureRandom.hex
    save!
    session_token
  end
end
