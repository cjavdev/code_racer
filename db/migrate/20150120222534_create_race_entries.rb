class CreateRaceEntries < ActiveRecord::Migration
  def change
    create_table :race_entries do |t|
      t.integer :race_id, null: false
      t.integer :user_id, null: false
      t.float :wpm

      t.timestamps null: false
    end

    add_index :race_entries, [:race_id, :user_id], unique: true
    add_index :race_entries, :race_id
    add_index :race_entries, :user_id
  end
end
