class Instigator
  attr_reader :race_entry

  def initialize(race_entry)
    @race_entry = race_entry
  end

  def notify_new_champ!

  end

  def notify_old_champ!

  end

  def instigate!
    if other_entries.empty?
      notify_new_champ!
      return
    end

    if beats_existing_leader?
      notify_old_champ!
      notify_new_champ!
    end
  end

  def beats_existing_leader?
    leading_wpm < race_entry.wpm
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
