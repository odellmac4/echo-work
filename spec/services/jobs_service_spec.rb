require 'rails_helper'

RSpec.describe JobsService do
  let!(:service) {JobsService.new}

  describe "Faraday connection" do
    it "establishes a faraday connection" do
      expect(service.code_signal_conn).to be_a Faraday::Connection
    end
  end

  describe "Code Signal job posting" do
    it "retrieves a job posting given a job id" do
      VCR.use_cassette("CodeSignal/retrieve_job_by_id", record: :new_episodes) do
        job_id = 318785415
        job = service.get_code_signal_job(job_id)
        expect(job).to be_a Hash
        expect(job).to have_key(:created)
        expect(job).to have_key(:last_updated)
        expect(job).to have_key(:title)
        expect(job).to have_key(:description)
        expect(job).to have_key(:seniority)
        expect(job).to have_key(:employment_type)
        expect(job).to have_key(:location)
        expect(job).to have_key(:url)
        expect(job).to have_key(:company_name)
        expect(job).to have_key(:company_url)
        expect(job).to have_key(:external_url)
        expect(job).to have_key(:salary)
        expect(job).to have_key(:applicants_count)
      end
    end
  end

  describe "Saving job data to the database" do
    it "saves job data retrieved from API to the database" do
      VCR.use_cassette("CodeSignal/retrieve_job_by_id", record: :new_episodes) do
        job_id = 318785415
        job_data = service.get_code_signal_job(job_id)
        saved_job = service.process_and_save(job_data)

        job = Job.find(saved_job.id)
        expect(job).to be_a Job
        expect(job.job_title).to eq job_data[:title]
        expect(job.company_name).to eq job_data[:company_name]
        expect(job.salary).to eq job_data[:salary]
        expect(job.full_time).to eq true
        expect(job.contract).to eq false
        expect(job.location).to eq job_data[:location]
        expect(job.date_posted).to eq job_data[:created]
        expect(job.industry).to eq job_data.dig(
          :job_industry_collection, 
          0, 
          :job_industry_list, 
          :industry
        )
        expect(job.qualifications).to eq job_data.dig(:job_functions_collection, 0)
      end
    end
  end
    
end