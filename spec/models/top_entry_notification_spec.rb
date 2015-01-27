require 'rails_helper'

RSpec.describe TopEntryNotification do
  let(:race_entry) { create(:race_entry) }

  before(:each) do
    ActionMailer::Base.delivery_method = :test
    ActionMailer::Base.perform_deliveries = true
    ActionMailer::Base.deliveries = []
    EventTweeter.sent_tweets = []
  end

  after(:each) do
    ActionMailer::Base.deliveries.clear
    EventTweeter.sent_tweets = []
  end

  context 'when the user gets_notifications' do
    ["facebook", "github"].each do |provider|
      it "sends an email if the users provider is #{ provider }" do
        user = create(:user, provider: provider)
        user_notification = TopEntryNotification.new(leader: user, entry: race_entry)
        user_notification.deliver
        expect(ActionMailer::Base.deliveries.count).to eq(1)
        expect(ActionMailer::Base.deliveries.first.to).to eq([user.email])
      end
    end

    ["facebook", "github"].each do |provider|
      it "sends an email if the lagger's provider is #{ provider }" do
        leader = create(:user, provider: provider)
        lagger = create(:user, provider: provider)

        user_notification = TopEntryNotification.new(
          leader: leader,
          lagger: lagger,
          entry: race_entry
        )

        user_notification.deliver
        expect(ActionMailer::Base.deliveries.count).to eq(2)
        expect(
          ActionMailer::Base.deliveries.map(&:to).sort
        ).to eq([[leader.email], [lagger.email]].sort)
      end
    end

    it 'does not send an email if the users provider is twitter' do
      user = create(:user, provider: "twitter")
      user_notification = TopEntryNotification.new(leader: user, entry: race_entry)
      user_notification.deliver
      expect(ActionMailer::Base.deliveries.count).to eq(0)
    end

    it 'tweets /cc the user if the users provider is twitter' do
      user = create(:user, provider: "twitter")
      user_notification = TopEntryNotification.new(leader: user, entry: race_entry)
      user_notification.deliver
      expect(EventTweeter.sent_tweets.count).to eq(1)
    end
  end

  context 'when the user does not gets_notifications' do
    it 'does not send email' do
      no_notification_user =
        create(:user, gets_notifications: false, provider: "facebook")
      race_entry = create(:race_entry, user: no_notification_user)
      user_notif = TopEntryNotification.new(leader: no_notification_user, entry: race_entry)
      user_notif.deliver
      expect(ActionMailer::Base.deliveries.count).to eq(0)
      expect(EventTweeter.sent_tweets.count).to eq(0)
    end

    it 'does not send tweets' do
      no_notification_user =
        create(:user, gets_notifications: false, provider: "twitter")
      race_entry = create(:race_entry, user: no_notification_user)
      user_notif = TopEntryNotification.new(leader: no_notification_user, entry: race_entry)
      user_notif.deliver
      expect(EventTweeter.sent_tweets.count).to eq(0)
      expect(ActionMailer::Base.deliveries.count).to eq(0)
    end
  end
end
