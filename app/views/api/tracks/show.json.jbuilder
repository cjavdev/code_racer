json.extract! @track, :id, :created_at, :updated_at, :title, :about, :content

json.leaders @track.leading_entries do |leader|
  json.nickname leader.nickname
  json.wpm leader.wpm
end
