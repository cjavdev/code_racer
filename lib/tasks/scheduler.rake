desc "Clean up old unfinished race entries"
task clean_nil_entries: :environment do
  puts "STARTING REMOVING NIL WPM RACE ENTRIES"
  RaceEntry
    .where('created_at < ?', 10.minutes.ago)
    .where(wpm: nil)
    .destroy_all
  puts "DONE REMOVING NIL RACE ENTRIES"
end
