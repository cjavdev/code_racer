class GuestUser
  NAME_POOL = [
    "SlowPoke",
    "straggler123",
    "5nail",
    "dilly-dallyr",
    "Lagger",
    "SlowestTyperOnEarth",
    "SlowestTyperEva",
    "SlowKing",
    "SlowBro",
    "fat_fingers",
    "l0afer",
    "stick-in-the-mud",
    "trailer",
    "slowboatjoe"
  ]

  def self.next_id
    self.ids += 1
  end

  def self.ids
    @ids ||= User.ids.max.to_i + 5000
  end

  def self.ids=(new_ids)
    @ids = new_ids
  end

  def self.find_by(params)
    user = find_by_token(params[:session_token])
    if user.nil?
      user = GuestUser.new
      user_cache[user.session_token] = user
    end
    user
  end

  def self.find_by_token(token)
    puts "Finding GuestUser by token: #{ token }"
    return nil if token.nil?
    p user_cache
    user_cache[token]
  end

  def self.user_cache
    @user_cache ||= {}
  end

  attr_reader :id

  def initialize
    @id = self.class.next_id
    self.class.user_cache[session_token] = self
  end

  def nickname
    @nickname ||= NAME_POOL.sample
  end

  def session_token
    @session_token ||= SecureRandom.hex
  end

  def guest?
    true
  end

  def reset_session_token!
    # no op
  end

  def average_wpm
    0
  end

  def picture
    "/assets/snail.jpg"
  end
end
