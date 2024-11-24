require 'sidekiq/web'
Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "home#index"
  resources :posts
  namespace :api do
    namespace :v1 do
      resources :posts
      resources :jobs do
        collection do
          get :import
        end
      end
    end
  end

  get "/home", to: "home#index"
  get "/login", to: "login#index"
  post "/login", to: "login#user_login"
end
