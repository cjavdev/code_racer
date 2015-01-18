require 'rails_helper'

feature 'User can enter a race' do
  scenario 'successfully' do
    login
    visit root_url

    expect(page).to have_link("Start. Your. Engine.")
  end
end
