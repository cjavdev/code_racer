Rails.application.routes.draw do
  root 'static_pages#root'
  get '/welcome' => 'static_pages#welcome', as: :welcome
  get '/auth/:provider/callback' => 'sessions#create'
end
