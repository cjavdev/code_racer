class User < ActiveRecord::Base
  def self.find_or_create_from_auth_hash(auth_hash)
    u = User.find_by(uid: auth_hash.fetch(:uid))
    return u if u
    u = User.create!(
      uid: auth_hash.fetch(:uid),
      email: auth_hash.fetch(:email),
      name: auth_hash.fetch(:name)
    )
  end
end
