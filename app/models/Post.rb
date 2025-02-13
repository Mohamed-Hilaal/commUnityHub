class Post < ApplicationRecord
    belongs_to :unity
    validates :title, :content, presence: true
end