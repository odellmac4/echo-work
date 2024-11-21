class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user
  has_many :replies

  validates :comment_text, presence: true
end
