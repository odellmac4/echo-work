require 'rails_helper'

RSpec.describe Reply, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:reply_text) }
  end

  describe 'associations' do
    it { should belong_to :user }
    it { should belong_to :comment }
  end
end
