class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user
  has_many :replies

  validates :comment_text, presence: true
  before_save :set_username

  def set_username
    self.username = comment.user.username
  end
end
