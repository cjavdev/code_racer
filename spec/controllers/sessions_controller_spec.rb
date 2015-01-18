require 'rails_helper'

RSpec.describe SessionsController, :type => :controller do
  describe '#create' do
    subject { get '/auth/github/callback' }
    it 'redirects to StaticPages#root' do
      expect(subject).to redirect_to('/')
    end
  end
end
