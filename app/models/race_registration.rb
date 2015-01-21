class RaceRegistration
  attr_reader :user, :track

  def initialize(user, track)
    @user = user
    @track = track
  end

  def save
    track.current_race.join
    # join the tracks current race
    # or create a new race and join that
  end
end
