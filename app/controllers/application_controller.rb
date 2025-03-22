class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    
    before_action :authenticate_user
    skip_before_action :authenticate_user, only: [:client_id, :google_oauth2, :register]

    def authenticate_user
        
        @current_user = User.find_by(id: session[:user_id])
        render json: { error: "Unauthorized" }, status: :unauthorized unless @current_user
    end
end
