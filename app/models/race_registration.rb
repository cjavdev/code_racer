class RaceRegistration
  attr_reader :user, :track

  def initialize(user, track)
    @user = user
    @track = track
  end

  def save
    create_race! unless track.current_race
    track.current_race.join(user)
  end

  def errors
    track.errors
  end

  def as_json(*args, &blk)
    {
      id: user.id,
      nickname: user.nickname,
      race_id: current_race.id,
      start_at: current_race.start_at,
      other_cars: other_cars
    }
  end

  def notify!
    Pusher[race_channel].trigger('add_car', {
      id: user.id,
      nickname: user.nickname,
      race_id: current_race.id
    })
  end

  private

  def race_channel
    "race_#{ current_race.id }"
  end

  def current_race
    track.current_race
  end

  def other_cars
    track.current_race.race_entries.map do |entry|
      unless entry.user == user
        { nickname: entry.user.nickname }
      end
    end.compact
  end

  def create_race!
    track.races.create!
  end
end
