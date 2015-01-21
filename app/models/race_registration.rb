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

  private

  def create_race!
    track.races.create!
  end
end
