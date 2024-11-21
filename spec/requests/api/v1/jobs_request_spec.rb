require 'rails_helper'

RSpec.describe "Job requests", type: :request do
  describe "Import jobs" do
    it "imports job(s) from API data" do
      VCR.use_cassette("CodeSignal/import_job_request", record: :new_episodes) do
        job_id_params = {job_ids:[318785415]}
        headers = {"CONTENT_TYPE" => "application/json"}

        post "/api/v1/jobs/import", headers: headers, params: job_id_params.to_json

        job_data = JSON.parse(response.body, symbolize_names: true).first
        created_job = Job.last

        expect(response).to be_successful
        expect(created_job.job_title).to eq "Senior Full Stack Software Engineer"
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
  end
end