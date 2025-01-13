class Unity < ApplicationRecord

    has_and_belongs_to_many :users

    validates :community_name, uniqueness: true, presence: true
    validates :category, :audience, :community_vision, :goals, :community_description,
     :contact_method, :long_term_objectives, :commitment_level, presence: true
     
end