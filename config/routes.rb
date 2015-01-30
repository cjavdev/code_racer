Rails.application.routes.draw do
  root 'static_pages#root'
  get '/welcome' => 'static_pages#welcome', as: :welcome
  get '/hackers' => 'static_pages#hackers', as: :hackers
  get '/auth/:provider/callback' => 'sessions#create'
  resource :session, only: [:destroy]
  resource :notification, only: [:show, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :invitations, only: [:create]
    resource :online_user, only: [:create, :destroy, :show]
    resource :setting, only: [:update]
    resources :stats, only: [:index]
    resources :tracks, only: [:index, :show, :create, :update] do
      resources :leaders, only: [:index]
    end
    resources :race_entries, only: [:create, :update]
    resources :stages, only: [:create, :show] do
      member do
        post '/start' => 'stages#start'
      end
    end
  end
end
