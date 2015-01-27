class EventMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.event_mailer.new_leader.subject
  #
  def new_leader(leader)
    @greeting = "Hi"

    mail to: leader.email
  end

  def cheater(user)
    mail to: user.email
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.event_mailer.surpassed.subject
  #
  def surpassed
    @greeting = "Hi"

    mail to: "to@example.org"
  end
end
