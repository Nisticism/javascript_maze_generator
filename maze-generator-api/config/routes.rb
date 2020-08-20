Rails.application.routes.draw do
  resources :scores
  resources :users
  resources :mazes

  post '/find_or_create' => 'users#find_or_create'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
