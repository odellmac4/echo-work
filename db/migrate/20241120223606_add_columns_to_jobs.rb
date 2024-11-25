class AddColumnsToJobs < ActiveRecord::Migration[7.1]
  def change
    add_column :jobs, :location, :string
    add_column :jobs, :date_posted, :string
    add_column :jobs, :industry, :string
    add_reference :jobs, :post, index: true
  end
end
