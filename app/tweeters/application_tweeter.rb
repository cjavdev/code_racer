class ApplicationTweeter
  attr_reader :client

  def self.sent_tweets
    @sent_tweets ||= []
  end

  def self.sent_tweets=(arr)
    @sent_tweets = arr
  end

  def initialize
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["TWITTER_KEY"]
      config.consumer_secret     = ENV["TWITTER_SECRET"]
      config.access_token        = ENV["TWITTER_ACCESS_TOKEN"]
      config.access_token_secret = ENV["TWITTER_ACCESS_SECRET"]
    end
  end

  def tweet(options)
    to = options.fetch(:to)
    body = options.fetch(:body)
    message = "/cc @#{ to } #{ body }"

    if Rails.env.production? || Rails.env.development?
      client.update(message)
    else
      self.class.sent_tweets.push(message)
    end
  end
end
