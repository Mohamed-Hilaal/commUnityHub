class AuthController < ApplicationController

    def login
        puts("pls ogin")
    end

    def google_oauth2_login
        redirect_to '/auth/google_oauth2'
    end

    def client_id
      
      data = {
        clientID: ENV['GOOGLE_CLIENT_ID']
      }

      render json: data, status: :ok
    end

    def google_oauth2
      token = params[:credential]

      begin
        payload = Google::Auth::IDTokens.verify_oidc(
          token,
          aud: ENV['GOOGLE_CLIENT_ID']
        )

        user = User.find_by(email: payload['email'])
        
        session[:user_id] = user.id
        
        if !user
          
          puts "User record not found, creating new user"
          # account = Account.create(account_type: 'basic')  # Create an account
          
          # user = User.create(
          #   email: payload['email'],
          #   full_name: payload['name'],
          #   username: payload['name'],
          #   google_id: payload['email'],
          #   account: account 
          # )

          render json: { status: 'success', payload: {email: payload['email'], username: payload['name']}, userExists: false }, status: :ok
        else 
          render json: { status: 'success', payload: {}, userExists: true }, status: :ok
          puts "User record found"
        end

      rescue Google::Auth::IDTokens::SignatureError
        render json: { status: 'error', message: 'Invalid credentials' }, status: :unauthorized
      rescue StandardError => e
        render json: { status: 'error', message: e.message }, status: :internal_server_error
      rescue ActiveRecord::RecordInvalid => e
        redirect_to json: { status: 'error', message: e.message }, status: :error
      end

    end
end
