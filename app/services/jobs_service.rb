class JobsService
  def get_code_signal_job(job_id)
    response = code_signal_conn.get("/cdapi/v1/professional_network/job/collect/#{job_id}")
    JSON.parse(response.body, symbolize_names: true)
  end

  def code_signal_conn
    Faraday.new(url: "https://api.coresignal.com") do |faraday|
      faraday.headers['Authorization'] = "Bearer #{Rails.application.credentials.code_signal[:api_key]}"
      faraday.headers['Accept'] = 'application/json'
    end
  end

  def process_and_save(job_data)
    return unless job_data
    # Refactor to use find_or_create_by to check if a job with the same title and company already exists

    Job.create!(
      job_title: job_data[:title],
      company_name: job_data[:company_name],
      job_description: job_data[:description],
      salary: job_data[:salary],
      full_time: job_data[:employment_type].downcase.include?("full"),
      contract: job_data[:employment_type].downcase.include?("contract")
      )
  end
end