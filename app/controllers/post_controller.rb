class PostController < ApplicationController
    def get_unity_posts
        begin 
            posts = Post.all
            unity_posts = posts.map do |post|
                post.as_json.merge({
                    posted_by: post.unity.community_name
                })
            end
            
            render json: { status: 'success', unity_posts: unity_posts }, status: :ok
    
          rescue ActiveRecord::RecordInvalid => e
            render json: { status: "failure", error: e.message }, status: :unprocessable_entity
          rescue StandardError => e
            render json: { status: "failure", error: "An unexpected error occurred: #{e.message}" }, status: :internal_server_error
          end
    end

    def create_unity_post
      begin
        
        post = Post.new(
          title: params[:title],
          content: params[:content],
          unity_id: @current_user.current_unity_id
        )

        if post.save
          render json: { status: "success", message: "Post is successfully created" }, status: :ok
        else
          render json: { status: "failure", errors: post.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end
end