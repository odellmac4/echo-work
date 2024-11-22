class Post < ApplicationRecord
  validates :likes, :dislikes, :post_text, presence: true
  validates :likes, :dislikes, numericality: true

  has_many :comments
  has_many :replies, through: :comments
end
