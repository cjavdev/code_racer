require 'rails_helper'

RSpec.describe EventTweeter do
  before(:each) do
    EventTweeter.sent_tweets = []
  end

  after(:each) do
    EventTweeter.sent_tweets = []
  end

  describe '#cheater' do
    it 'tweets at the cheater' do
      user = create(:user, provider: "twitter", nickname: "testnick")
      race_entry = create(:race_entry, wpm: 10)
      EventTweeter.new.cheater(user, race_entry)
      expect(EventTweeter.sent_tweets.count).to eq(1)
      expect(EventTweeter.sent_tweets.first).to include("testnick")
      expect(EventTweeter.sent_tweets.first)
        .to eq("/cc testnick :( no way you typed 10.0 WPM. hit me up with the code and you'll get up here: goo.gl/YwTEh8")
    end
  end
end
