require 'rails_helper'

RSpec.describe ApplicationTweeter do
  describe '#tweet' do
    before(:each) do
      ApplicationTweeter.sent_tweets = []
    end

    after(:each) do
      ApplicationTweeter.sent_tweets = []
    end

    it 'sets the to as a cc and the body as the remaining content' do
      app_tweeter = ApplicationTweeter.new
      user = create(:user, provider: "twitter", nickname: "test")
      app_tweeter.tweet(to: user, body: "this is the body")
      expect(ApplicationTweeter.sent_tweets.count).to eq(1)
    end
  end
end
