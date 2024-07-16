Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "auth#login"
  
  # get '/auth/google_oauth2', to: 'auth#google_oauth2_login'
  get '/auth/google_oauth2/callback', to: 'auth#create'
end
