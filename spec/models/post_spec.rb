require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:likes) }
    it { should validate_presence_of(:dislikes) }
    it { should validate_presence_of(:post_text) }
    it { should validate_numericality_of(:dislikes) }
    it { should validate_numericality_of(:likes) }
  end

  describe 'associations' do
    it { should have_many(:comments) }
    it { should have_many(:replies).through(:comments) }
  end
end