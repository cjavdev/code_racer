class CreateStageEntries < ActiveRecord::Migration
  def change
    create_table :stage_entries do |t|
      t.integer :stage_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :stage_entries, [:stage_id, :user_id], unique: true
    add_index :stages, :owner_id
  end
end
