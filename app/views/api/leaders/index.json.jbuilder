json.array! @leading_entries do |leader|
  json.nickname leader.nickname
  json.wpm leader.wpm
end
