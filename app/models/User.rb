class User < ApplicationRecord
    belongs_to :account
    has_many :unity_posts 
    has_and_belongs_to_many :unities
    has_many :unity_chat_memberships, dependent: :destroy
    has_many :unity_chats, through: :unity_chat_memberships, source: :unity_chat
    belongs_to :current_unity, class_name: "Unity", optional: true

    validates :username, presence: true, uniqueness: true
    validates :google_id, presence: true, uniqueness: true
end