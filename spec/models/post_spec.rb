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
Job.create!({job_title: "Software Engineer, TikTok Brand Ads", company_name: "TikTok", job_description: "test job description", qualifications: "test qualifications", salary: "$130,000", full_time: true, contract: false, location: "San Francisco, CA", date_posted: "11/22/24", industry: "Entertainment Providers"})
Post.create!({job_id: 1, post_text: "test post text", likes: 3, dislikes: 14})
User.create!({name: "Test", email: "test@email.com", username: "TestUsername", password: "test", password_confirmation: "test"})
Comment.create!({post_id: 1, user_id: 1, comment_text: "Test comment text."})
Reply.create!({user_id: 1, comment_id: 1, reply_text: "Test reply text."})