Rails.application.routes.draw do
  root 'static_pages#root'
  get '/welcome' => 'static_pages#welcome', as: :welcome
  get '/auth/:provider/callback' => 'sessions#create'
  resource :session, only: [:destroy]

  namespace :api, defaults: { format: :json } do
    resources :tracks, only: [:index, :show, :create, :update] do
      resources :leaders, only: [:index]
    end
    resources :race_entries, only: [:create, :update]
    resource :wpm, only: [:create]
    resources :stages, only: [:create, :show]
  end
end
