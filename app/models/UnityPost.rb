class UnityPost < ApplicationRecord
    belongs_to :user
    belongs_to :unity
  
    validate :user_must_be_a_member
  
    private
  
    def user_must_be_a_member
      unless unity.users.include?(user)
        errors.add(:user, "must be a member of the community to post")
      end
    end
  end
  