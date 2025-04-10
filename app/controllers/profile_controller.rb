class ProfileController < ApplicationController

    def register
        data = params[:data]
  
        begin
          user = User.find_by(email: data[:email])

          if !user
            account = Account.create(account_type: data[:accountType])  # Create an account

            user = User.create(
              email: data[:email],
              username: data[:username],
              full_name: data[:username],
              google_id: data[:email],
              account: account
            )

            puts "user record not found, creating new user"
          
          else
            
            puts "user record found"
          end
          session[:user_id] = user.id
          render json: { status: 'success' }, status: :ok
    
        rescue ActiveRecord::RecordInvalid => e
          render json: { status: 'error', message: e.message }, status: :error
        rescue StandardError => e
          render json: { status: 'error', message: e.message }, status: :internal_server_error
        end
      end
end