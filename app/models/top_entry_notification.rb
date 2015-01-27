class TopEntryNotification
  attr_reader :leader, :lagger, :entry

  def initialize(options)
    @leader = options.fetch(:leader)
    @entry = options.fetch(:entry)
    @lagger = options[:lagger]
  end

  def deliver
    deliver_to_leader!
    deliver_to_lagger! if lagger
  end

  private

  def deliver_to_leader!
    return unless gets_notifications?(leader)

    if has_email_provider?(leader)
      EventMailer.new_leader(leader, entry).deliver_later
    end

    if is_twitter_user?(leader)
      EventTweeter.new.new_leader(leader, entry)
    end
  end

  def deliver_to_lagger!
    return unless gets_notifications?(lagger)

    if has_email_provider?(lagger)
      EventMailer.surpassed(leader, lagger, entry).deliver_later
    end

    if is_twitter_user?(lagger)
      EventTweeter.new.surpassed(leader, lagger, entry)
    end
  end

  def is_twitter_user?(user)
    user.provider == "twitter"
  end

  def has_email_provider?(user)
    user.provider == "github" || user.provider == "facebook"
  end

  def gets_notifications?(user)
    user.gets_notifications
  end
end
