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
        

        if !user
          
          account = Account.create(account_type: 'basic')  # Create an account
          
          user = User.create(
            email: payload['email'],
            full_name: payload['name'],
            username: payload['name'],
            google_id: payload['email'],
            account: account 
          )
          
        end

        render json: { status: 'success' }
      rescue Google::Auth::IDTokens::SignatureError
        render json: { status: 'error', message: 'Invalid credentials' }, status: :unauthorized
      rescue StandardError => e
        render json: { status: 'error', message: e.message }, status: :internal_server_error
      rescue ActiveRecord::RecordInvalid => e
        redirect_to json: { status: 'error', message: e.message }, status: :error
      end

    end


    def apiTesting

      response_data = {
        message: "Success",
        data: {
          id: 1,
          name: "Sample"
        }
      }
      
      # Render the response as JSON
      render json: response_data, status: :ok
    end


    def create

      end
      
      def destroy
        session[:user_id] = nil 
        redirect_to root_path, notice: 'Successfully logged out!'
      end
      

    def failure
        redirect_to root_path, alert: 'Authentication failed, please try again.'
    end

end
