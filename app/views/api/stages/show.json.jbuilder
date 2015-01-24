json.extract! @stage, :id, :token, :created_at, :updated_at

json.racers @stage.racers do |racer|
  json.id racer.id
  json.nickname racer.nickname
end
