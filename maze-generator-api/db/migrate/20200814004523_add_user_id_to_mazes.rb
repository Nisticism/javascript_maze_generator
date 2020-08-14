class AddUserIdToMazes < ActiveRecord::Migration[6.0]
  def change
    add_reference :mazes, :user, foreign_key: true
  end
end
