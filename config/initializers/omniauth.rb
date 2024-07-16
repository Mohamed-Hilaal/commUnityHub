# config/initializers/omniauth.rb
Rails.logger.info("OmniAuth configuration initialized")

OmniAuth.config.allowed_request_methods = [:post]

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'], {
    scope: 'userinfo.email, userinfo.profile',
    prompt: 'select_account'
  }
end
