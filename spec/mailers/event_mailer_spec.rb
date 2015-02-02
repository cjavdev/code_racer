require "rails_helper"

RSpec.describe EventMailer, :type => :mailer do
  let(:leader) { create(:user, nickname: 'leader') }
  let(:lagger) { create(:user, nickname: 'lagger') }
  let(:race_entry) { create(:race_entry, user: leader) }
  describe "new_leader" do
    let(:mail) { EventMailer.new_leader(leader, race_entry) }

    it "renders the headers" do
      expect(mail.subject).to eq("leader Takes the lead!")
      expect(mail.to).to eq([leader.email])
      expect(mail.from).to eq(["instigator@wpmchallenge.com"])
    end
  end

  describe "surpassed" do
    let(:mail) { EventMailer.surpassed(leader, lagger, race_entry) }

    it "renders the headers" do
      expect(mail.subject).to eq("Taste that dust?")
      expect(mail.to).to eq([lagger.email])
      expect(mail.from).to eq(["instigator@wpmchallenge.com"])
    end
  end
end
