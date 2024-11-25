class Reply < ApplicationRecord
  belongs_to :user
  belongs_to :comment

  validates :reply_text, presence: true
end
