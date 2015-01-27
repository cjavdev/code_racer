class Instigator
  attr_reader :race_entry

  def initialize(race_entry)
    @race_entry = race_entry
  end

  def notify!(lagger = nil)
    TopEntryNotification.new(
      leader: race_entry.user,
      lagger: lagger,
      entry: race_entry
    ).deliver
  end

  def instigate!
    if other_entries.empty?
      notify!
      return
    end

    if beats_existing_leader?
      notify!(lagger)
    end
  end

  def beats_existing_leader?
    leading_wpm < race_entry.wpm
  end

  def lagger
    other_entries.first.user
  end

  def leading_wpm
    other_entries.first.try(:wpm) || 0
  end

  private

  def other_entries
    race_entry
      .race
      .track
      .race_entries
      .where
      .not(id: race_entry.id)
      .order(wpm: :desc)
  end
end
