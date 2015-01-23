json.array! @tracks do |track|
  json.extract! track, :id, :created_at, :updated_at, :title, :about, :content
  if track.top_entry
    json.top_dog do
      json.nickname track.top_entry.user.nickname
      json.wpm track.top_entry.wpm
    end
  end
end
