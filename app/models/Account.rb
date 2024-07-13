class Account < ApplicationRecord
    has_many :users

    validates :account_type, presence: true
end