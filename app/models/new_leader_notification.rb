class NewLeaderNotification
  attr_reader :leader

  def initialize(leader)
    @leader = leader
  end

  def deliver
    if leader_has_email_provider?
      EventMailer.new_leader(leader).deliver_later
    end
  end

  private

  def leader_has_email_provider?
    leader.provider == "github" || leader.provider == "facebook"
  end

  def leader_gets_notifications?
    leader.gets_notifications
  end
end
