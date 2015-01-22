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
      nickname: user.nickname,
      race_id: current_race.id,
      other_cars: other_cars
    }
  end

  def notify!
    Pusher["race_#{ current_race.id }"].trigger('add_car', {
      nickname: user.nickname,
      race_id: current_race.id
    })
  end

  private

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
