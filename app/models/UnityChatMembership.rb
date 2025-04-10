class UnityChatMembership < ApplicationRecord
    belongs_to :unity_chat
    belongs_to :member, class_name: "User", foreign_key: "user_id"
  end
  

  