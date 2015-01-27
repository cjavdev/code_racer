require 'rails_helper'

RSpec.describe NewLeaderNotification do
  before(:each) do
    ActionMailer::Base.delivery_method = :test
    ActionMailer::Base.perform_deliveries = true
    ActionMailer::Base.deliveries = []
  end

  after(:each) do
    ActionMailer::Base.deliveries.clear
  end

  context 'when the user gets_notifications' do
    ["facebook", "github"].each do |provider|
      it "sends an email if the users provider is #{ provider }" do
        user = create(:user, provider: provider)
        user_notification = NewLeaderNotification.new(user)
        user_notification.deliver
        expect(ActionMailer::Base.deliveries.count).to eq(1)
        expect(ActionMailer::Base.deliveries.first.to).to eq([user.email])
      end
    end

    it 'does not send an email if the users provider is twitter' do
      user = create(:user, provider: "twitter")
      user_notification = NewLeaderNotification.new(user)
      user_notification.deliver
      expect(ActionMailer::Base.deliveries.count).to eq(0)
    end

    it 'tweets /cc the user if the users provider is twitter' do
      user = create(:user, provider: "twitter")
      user_notification = NewLeaderNotification.new(user)
      user_notification.deliver
      expect(false).to eq(true)
    end
  end

  context 'when the user does not gets_notifications' do
    it 'does not send email or tweet'
  end
end
