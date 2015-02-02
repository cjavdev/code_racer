json.extract! @stage, :id, :token, :created_at, :updated_at

json.racers @stage.racer_array do |racer|
  json.id racer.id
  json.nickname racer.nickname
  json.wpm racer.average_wpm
  json.picture racer.picture
end
