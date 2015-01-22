require 'rails_helper'

feature 'User can sign in with Github' do
  scenario 'successfully' do
    visit root_url
    click_on "Sign in with Github"

    expect(page).to have_content("Loading...")
  end
end
