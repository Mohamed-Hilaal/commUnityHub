class User < ApplicationRecord
    belongs_to :account

    validates :username, presence: true, uniqueness: true
    validates :google_id, presence: true, uniqueness: true
end