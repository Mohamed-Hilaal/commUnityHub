class UnityPostController < ApplicationController
    before_action :ensure_user_is_member, only: [:create]
  
    def create
      unity_post = UnityPost.new(unity_post_params)
      unity_post.user = @current_user
  
      if unity_post.save
        render json: { status: "success", unity_post: unity_post }, status: :created
      else
        render json: { error: unity_post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def get_unity_posts

      unity_id = params[:unity_id]

      unity = Unity.find(unity_id)

      if unity
        unity_posts = unity.unity_posts
        render json: { status: "success", unity_posts: unity_posts }, status: :ok
      else
        render json: { error: "Unity not found" }, status: :not_found
      end
    end
  
    private
  
    def ensure_user_is_member
      unity = Unity.find(params[:unity_id])
      binding.pry
      unless unity.users.include?(@current_user)
        render json: { error: "You must be a member of this unity to post" }, status: :forbidden
      end
    end
  
    def unity_post_params
      params.require(:unity_post).permit(:content, :unity_id)
    end
  end
  