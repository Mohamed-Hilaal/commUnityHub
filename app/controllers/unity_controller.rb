class UnityController < ApplicationController

    def create

      begin
        unity = Unity.new(
          community_name: params[:community_name],
          contact_method: params[:contact_method],
          commitment_level: params[:commitment_level],
          community_vision: params[:community_vision],
          community_description: params[:community_description],
          goals: params[:goals],
          category: params[:category],
          audience: params[:audience],
          long_term_objectives: params[:long_term_objectives]
        )

        if unity.save
          if @current_user.current_unity_id.nil?
            @current_user.current_unity = unity
          end

          @current_user.save!

          render json: { status: "success", message: "Unity is successfully created" }, status: :ok
        else
          render json: { status: "failure", errors: unity.errors.full_messages }, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordInvalid => e
        render json: { status: "failure", error: e.message }, status: :unprocessable_entity
      rescue StandardError => e
        render json: { status: "failure", error: "An unexpected error occurred: #{e.message}" }, status: :internal_server_error
      end
    end

    def get_unities
      
      begin 

        unities = Unity.all

        render json: {status: 'success', unities: unities}, status: :ok

      rescue ActiveRecord::RecordInvalid => e
        render json: { status: "failure", error: e.message }, status: :unprocessable_entity
      rescue StandardError => e
        render json: { status: "failure", error: "An unexpected error occurred: #{e.message}" }, status: :internal_server_error
      end
    end
    
  end
  