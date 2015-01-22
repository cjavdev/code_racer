require 'rails_helper'

feature 'User can sign in with Facebook' do
  scenario 'successfully' do
    visit root_url
    click_on "Sign in with Facebook"

    expect(page).to have_content("Loading...")
  end
end
