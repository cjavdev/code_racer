class NewLeaderNotification
  attr_reader :leader, :entry

  def initialize(leader, entry)
    @leader = leader
    @entry = entry
  end

  def deliver
    if leader_has_email_provider?
      EventMailer.new_leader(leader).deliver_later
    end

    if leader_is_twitter_user?
      EventTweeter.new_leader(leader, entry)
    end
  end

  private

  def leader_is_twitter_user?
    leader.provider == "twitter"
  end

  def leader_has_email_provider?
    leader.provider == "github" || leader.provider == "facebook"
  end

  def leader_gets_notifications?
    leader.gets_notifications
  end
end
