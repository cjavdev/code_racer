Rails.application.routes.draw do
  root 'static_pages#root'
  get '/welcome' => 'static_pages#welcome', as: :welcome
  get '/auth/:provider/callback' => 'sessions#create'
  resource :session, only: [:destroy]

  namespace :api, defaults: { format: :json } do
    resources :tracks, only: [:index, :show]
    resources :race_entries, only: [:create]
    resource :wpm, only: [:create]
  end
end
