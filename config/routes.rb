Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")

  post '/auth/google_oauth2', to: 'auth#google_oauth2'
  # get '/auth/google_oauth2/callback', to: 'auth#create'
  # post '/auth/google_oauth2/callback', to: 'auth#google_oauth2'

  post 'auth/apiTesting', to: 'auth#apiTesting'

  get 'auth/getClientID', to: 'auth#client_id'
  # post '/login/google/callback', to: 'auth#creat'
end