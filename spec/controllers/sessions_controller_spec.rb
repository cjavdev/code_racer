require 'rails_helper'

RSpec.describe SessionsController, :type => :controller do
  describe '#create' do
    subject { get '/auth/github/callback' }
    context 'with valid credentials' do
      it 'redirects to StaticPages#root' do
        OmniAuth.config.add_mock(:github, { :uid => '12345' })
        expect(subject).to redirect_to('/')
      end
    end
  end
end
