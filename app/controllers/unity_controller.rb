class UnityController < ApplicationController

    def create
      data = params[:data]
  
      begin
        unity = Unity.new(
          community_name: data[:community_name],
          contact_method: data[:contact_method],
          commitment_level: data[:commitment_level],
          community_vision: data[:community_vision],
          community_description: data[:community_description],
          goals: data[:goals],
          category: data[:category],
          audience: data[:audience],
          long_term_objectives: data[:long_term_objectives]
        )
  
        if unity.save
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
    
  end
  