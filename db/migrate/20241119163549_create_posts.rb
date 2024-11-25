class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.references :job, null: false, foreign_key: true
      t.string :post_text
      t.integer :likes, default: 0
      t.integer :dislikes, default: 0

      t.timestamps
    end
  end
end
