class EventMailer < ApplicationMailer
  def new_leader(leader, entry)
    @leader = leader
    @entry = entry

    mail to: leader.email, subject: "#{ leader.nickname } Takes the lead!"
  end

  def cheater(user)
    mail to: user.email
  end

  def surpassed(leader, lagger, entry)
    @leader = leader
    @lagger = lagger
    @entry = entry

    mail to: lagger.email, subject: "Taste that dust?"
  end
end
