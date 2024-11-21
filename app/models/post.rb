class Post < ApplicationRecord
  belongs_to :job
  has_many :comments
end
