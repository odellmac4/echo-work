class User < ApplicationRecord
  validates :name, :username, :email, :password_digest, presence: true
  validates :email, uniqueness: true
  has_secure_password

  has_many :comments, dependent: :destroy
end
