class CreateJobs < ActiveRecord::Migration[7.1]
  def change
    create_table :jobs do |t|
      t.string :job_title
      t.string :company_name
      t.string :job_description
      t.string :qualifications
      t.string :salary
      t.boolean :full_time
      t.boolean :contract

      t.timestamps
    end
  end
end
