class AuthController < ApplicationController

    def login
        puts("pls ogin")
    end

    def google_oauth2_login
        redirect_to '/auth/google_oauth2'  # Redirect to Google's OAuth2 authorization endpoint
    end

    def create

        auth = request.env['omniauth.auth']
        
        begin
          user = User.find_by(email: auth['info']['email'])
          
          if !user
            # User doesn't exist, create new account and user
            account = Account.create(account_type: 'basic')  # Create an account
            
            user = User.create(
              email: auth['info']['email'],
              full_name: auth['info']['name'],
              username: auth['info']['name'],
              google_id: auth['info']['email'],
              account: account 
            )
          end
      
        #   session[:user_id] = user.id  # Set the user session ID
          redirect_to root_path, notice: 'Successfully logged in!'
        rescue ActiveRecord::RecordInvalid => e
          puts("Error occurred while logging in: #{e.message}")
          redirect_to root_path, notice: 'Failed to log in!'
        end

      end
      
      def destroy
        session[:user_id] = nil 
        redirect_to root_path, notice: 'Successfully logged out!'
      end
      

    def failure
        redirect_to root_path, alert: 'Authentication failed, please try again.'
    end

end
