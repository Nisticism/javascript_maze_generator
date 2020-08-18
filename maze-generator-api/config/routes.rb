Rails.application.routes.draw do
  resources :scores
  resources :users
  resources :mazes

  get '/logout' => 'users#logout'
  get '/session' => 'users#session'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
