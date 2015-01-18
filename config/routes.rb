Rails.application.routes.draw do
  root 'static_pages#root'
  get '/welcome' => 'static_pages#welcome', as: :welcome
  get '/auth/github/callback' => 'sessions#create'

  namespace :api, defaults: { format: :json } do
    resources :tracks
  end
end
