class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.string :time
      t.integer :user_id
      t.integer :maze_id

      t.timestamps
    end
  end
end
