require 'rails_helper'

RSpec.describe "Job requests", type: :request do
  describe "Import jobs" do
    it "imports job(s) from API data" do
      VCR.use_cassette("CodeSignal/import_job_request", record: :new_episodes) do
        job_id_params = {job_ids:[318785415]}
        headers = {"CONTENT_TYPE" => "application/json"}

        get "/api/v1/jobs/import", headers: headers, params: job_id_params

        job_data = JSON.parse(response.body, symbolize_names: true).first
        created_job = Job.last

        expect(response).to be_successful
        expect(created_job.job_title).to eq job_data[:job_title]
        expect(created_job.company_name).to eq "Zipline"
        expect(created_job.job_description).to be_a String
        expect(created_job.salary).to eq "$170,000.00/yr - $210,000.00/yr"
        expect(created_job.full_time).to eq true
        expect(created_job.contract).to eq false
        expect(created_job.location).to eq "United States"
        expect(created_job.date_posted).to eq "2024-11-18 10:37:57"
        expect(created_job.industry).to eq "Computer Hardware Manufacturing and Automation Machinery Manufacturing"
        expect(created_job.qualifications).to eq "Engineering and Information Technology"
      end
    end

    it "runs background job to create job posting" do
      VCR.use_cassette("CodeSignal/import_job_request", record: :new_episodes) do
        job_id_params = {job_ids:[318785415]}
        headers = {"CONTENT_TYPE" => "application/json"}

        get "/api/v1/jobs/import", headers: headers, params: job_id_params

        job = Job.last

        Sidekiq::Testing.inline! do
          CreatePostsJob.perform_async(job.id)
        end

        # Verify the post was created
        post = Post.find_by(job_id: job.id)
        expect(post).not_to be_nil
        expect(post.job_id).to eq(job.id)
      end
    end
  end
end