class Unity < ApplicationRecord
    has_many :unity_posts
    has_and_belongs_to_many :users
    has_many :posts
    belongs_to :creator, class_name: "User", foreign_key: "creator_id", optional: true
      
    validates :community_name, uniqueness: true, presence: true
    validates :category, :audience, :community_vision, :goals, :community_description,
     :contact_method, :long_term_objectives, :commitment_level, presence: true
     
end