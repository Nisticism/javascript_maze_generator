class CreateMazes < ActiveRecord::Migration[6.0]
  def change
    create_table :mazes do |t|
      t.integer :width
      t.integer :height
      t.integer :coins

      t.timestamps
    end
  end
end
