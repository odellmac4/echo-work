require 'rails_helper'

RSpec.describe "Job requests", type: :request do
  describe "Import jobs" do
    it "imports job(s) from API data" do
      VCR.use_cassette("CodeSignal/retrieve_job_by_id", record: :new_episodes) do
        job_id_params = {job_ids:[318785415]}
        headers = {"CONTENT_TYPE" => "application/json"}

        post "/api/v1/jobs/import", headers: headers, params: job_id_params.to_json

        job_data = JSON.parse(response.body, symbolize_names: true).first
        created_job = Job.last

        expect(response).to be_successful
        expect(created_job.job_title).to eq job_data[:job_title]
        expect(created_job.company_name).to eq job_data[:company_name]
        expect(created_job.job_description).to eq job_data[:job_description]
        expect(created_job.salary).to eq job_data[:salary]
        expect(created_job.full_time).to eq job_data[:full_time]
        expect(created_job.contract).to eq job_data[:contract]
      end
    end
  end
end