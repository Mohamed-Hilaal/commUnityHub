class ProfileController < ApplicationController

    def register
        data = params[:data]
    
        begin
          user = User.find_by(email: data[:email])
          raise ActiveRecord::RecordNotFound, 'User not found' unless user
    
          if user.update(username: data[:username])
            render json: { status: 'success' }, status: :ok
          else
            render json: { status: 'failure', error: user.errors.messages[:username] }, status: :unprocessable_entity
          end
    
        rescue ActiveRecord::RecordNotFound => e
          render json: { status: 'error', message: e.message }, status: :not_found
        rescue StandardError => e
          render json: { status: 'error', message: e.message }, status: :internal_server_error
        end
      end
end