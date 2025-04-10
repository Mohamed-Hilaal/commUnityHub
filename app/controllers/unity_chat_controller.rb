class UnityChatController < ApplicationController
  
    def get
        recipients = find_recipients

        if recipients
            render json: {status: 'Success', message: 'Unity Chats found', recipients: recipients}, status: :ok
        else
            render json: { errors: "something went wrong !" }, status: :unprocessable_entity
        end
    end
    
    def create

        user1 = User.last
        user2 = User.first
        unity_chat = UnityChat.find_or_create_unity_chat(user1, user2)

        if unity_chat
            render json: {status: 'Success', message: 'Unity Chat created', unity_chat: unity_chat}, status: :ok
        else
            render json: { errors: unity_chat.errors.full_messages }, status: :unprocessable_entity
        end

    end


    def find_recipients
        
        recipients = @current_user.unity_chats.map { | chat |
            recipient = chat.members.select { | member | member.id != User.first.id }
            if recipient.first
                {recipient_id: recipient.first.id, recipient_name: recipient.first.username, chat_id: chat.id}
            end
        }

        recipients
    end
end