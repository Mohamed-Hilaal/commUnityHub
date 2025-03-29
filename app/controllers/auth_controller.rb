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

    def get_current_user_details
      begin
        user = User.find_by(id: @current_user.id)
        if user
          payload = {current_user_email: user.email, current_user_id:  user.id ,current_user_name: user.username, current_unity_name: user.current_unity.community_name, current_unity_id: user.current_unity_id}
          render json: { status: 'success', payload: payload}, status: :ok
        else 
          render json: { status: 'failure', message: "Current user not found"}, status: :unauthorized
        end
      rescue StandardError => e
        render json: { status: 'error', message: e.message }, status: :internal_server_error
      end
    end

    def google_oauth2
      token = params[:credential]

      begin
        payload = Google::Auth::IDTokens.verify_oidc(
          token,
          aud: ENV['GOOGLE_CLIENT_ID']
        )

        user = User.find_by(email: payload['email'])
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
          session[:user_id] = user.id
          payload = {current_user_id:  user.id ,current_user_name: user.username, current_unity_name: user.current_unity && user.current_unity.community_name, current_unity_id: user.current_unity_id}
          render json: { status: 'success', payload: payload, userExists: true}, status: :ok
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
