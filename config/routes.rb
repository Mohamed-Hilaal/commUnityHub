Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")

  post '/auth/google_oauth2', to: 'auth#google_oauth2'

  get '/auth/get_current_user_details', to: 'auth#get_current_user_details'

  get 'auth/getClientID', to: 'auth#client_id'

  patch 'profile/register', to: 'profile#register'

  post '/unity/create', to: 'unity#create'

  get '/unity/get_unities', to: 'unity#get_unities'

  get '/unity/get_unity_members/:unity_id', to: 'unity#get_unity_members'

  get '/post/get_posts', to: 'post#get_posts'

  post '/post/create_post', to: 'post#create_post'

  get '/unityPost/get_unity_posts/:unity_id', to: 'unity_post#get_unity_posts'

  post '/unityPost/create', to: 'unity_post#create'

  post '/unity/join', to: 'unity#join'



end