class UnityChat < ApplicationRecord
    has_many :unity_chat_memberships, dependent: :destroy
    has_many :members, through: :unity_chat_memberships, source: :member
  
    def self.find_or_create_unity_chat(member1, member2)
      unity_chat = UnityChat.joins(:unity_chat_memberships)
                    .where(unity_chat_memberships: { user_id: [member1.id, member2.id] })
                    .group("unity_chats.id")
                    .having("COUNT(unity_chat_memberships.user_id) = 2")
                    .first
  
      return unity_chat if unity_chat
  
      unity_chat = UnityChat.create!
      unity_chat.members << [member1, member2]
      unity_chat
    end
  end