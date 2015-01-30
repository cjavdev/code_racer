require "rails_helper"

RSpec.describe EventMailer, :type => :mailer do
  describe "new_leader" do
    let(:leader) { create(:user, nickname: 'leader') }
    let(:lagger) { create(:user, nickname: 'lagger') }
    let(:race_entry) { create(:race_entry, user: leader) }
    let(:mail) { EventMailer.new_leader(leader, race_entry) }

    it "renders the headers" do
      expect(mail.subject).to eq("leader Takes the lead!")
      expect(mail.to).to eq(["to@example.org"])
      expect(mail.from).to eq(["instigator@wpmchallenge.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Hi")
    end
  end

  describe "surpassed" do
    let(:mail) { EventMailer.surpassed }

    it "renders the headers" do
      expect(mail.subject).to eq("Surpassed")
      expect(mail.to).to eq(["to@example.org"])
      expect(mail.from).to eq(["instigator@wpmchallenge.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Hi")
    end
  end
end
