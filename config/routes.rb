Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")

  post '/auth/google_oauth2', to: 'auth#google_oauth2'

  get 'auth/getClientID', to: 'auth#client_id'

  patch 'profile/register', to: 'profile#register'

end