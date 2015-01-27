class EventTweeter < ApplicationTweeter
  def new_leader(leader, entry)
    tweet(
      to: leader.nickname,
      body: "Awesome! #{ entry.wpm } WPM puts you at the top of #{ entry.race.track.title } http://goo.gl/hbwfvb"
    )
  end

  def cheater(user, entry)
    tweet(
      to: user.nickname,
      body: ":( no way you typed #{ entry.wpm } WPM. hit me up with the code and you'll get up here: goo.gl/YwTEh8"
    )
  end

  def surpassed(new, old, entry)
    name = ""
    if new.provider == "twitter"
      name = "@#{ new.nickname }"
    else
      name = "someone"
    end

    tweet(
      to: old.nickname,
      body: "Awe dang! #{ name } beat your score on #{ entry.race.track.title } /w #{ entry.wpm }. You can catch'em! http://goo.gl/hbwfvb"
    )
  end
end
