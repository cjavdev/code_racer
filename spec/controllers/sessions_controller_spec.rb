require 'rails_helper'

RSpec.describe SessionsController, :type => :controller do
  describe '#create' do
    before(:each) do
      OmniAuth.config.add_mock(:github, fake_auth_hash)
      request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:github]
    end

    context 'with valid credentials' do
      it 'redirects to StaticPages#root' do
        get :create
        expect(subject).to be_logged_in
        expect(subject).to redirect_to('/')
      end
    end
  end
end
