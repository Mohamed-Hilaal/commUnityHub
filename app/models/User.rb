class User < ApplicationRecord
    belongs_to :account
    has_and_belongs_to_many :unities

    validates :username, presence: true, uniqueness: true
    validates :google_id, presence: true, uniqueness: true
end