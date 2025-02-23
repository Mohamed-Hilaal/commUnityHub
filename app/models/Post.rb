class Post < ApplicationRecord
    belongs_to :unity
    validates :content, presence: true
end