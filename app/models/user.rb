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
#  provider      :string           default("facebook")
#  admin         :boolean          default("false")
#

class User < ActiveRecord::Base
  validates :session_token, :nickname, presence: true
  has_many :authored_tracks, class_name: "Track", foreign_key: :author_id
  has_many :race_entries

  has_many :stages, foreign_key: :owner_id

  before_validation do
    self.session_token ||= SecureRandom.hex
  end

  def picture
    if provider == "facebook"
      "http://graph.facebook.com/#{ uid }/picture?type=square"
    elsif provider == "github"
      "https://avatars3.githubusercontent.com/u/#{ uid }?v=3&s=460"
    elsif provider == "twitter"
      "/assets/snail.jpg"
    end
  end

  def average_wpm
    race_entries
      .finished
      .select('AVG(wpm) avg_wpm')
      .group('user_id')
      .to_a
      .first
      .avg_wpm
      .round(2)
  end

  def stats
    race_entries
      .where
      .not(wpm: nil)
      .where('wpm > ?', 10)
      .order(:created_at)
      .pluck(:created_at, :wpm)
  end

  def self.find_or_create_from_auth_hash(auth_hash, provider)
    u = User.find_by(uid: auth_hash.fetch(:uid), provider: provider)
    return u if u
    case provider
    when "github"
      u = User.create!(
        uid: auth_hash.fetch(:uid),
        email: auth_hash.fetch(:info)[:email] || "noemail@noemail.com",
        name: auth_hash.fetch(:info).fetch(:name),
        nickname: auth_hash.fetch(:info).fetch(:nickname),
        provider: provider
      )
    when "facebook"
      u = User.create!(
        uid: auth_hash.fetch(:uid),
        email: auth_hash.fetch(:info).fetch(:email),
        name: auth_hash.fetch(:info).fetch(:name),
        nickname: auth_hash.fetch(:info).fetch(:first_name),
        provider: provider
      )
    when "twitter"
      u = User.create!(
        uid: auth_hash.fetch(:uid),
        email: 'noemail@twitter.com',
        name: auth_hash.fetch(:info).fetch(:name),
        nickname: auth_hash.fetch(:info).fetch(:nickname),
        provider: provider
      )
    end
  end

  def reset_session_token!
    self.session_token = SecureRandom.hex
    save!
    session_token
  end

  def guest?
    false
  end
end
