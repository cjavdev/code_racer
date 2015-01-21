class CreateRaces < ActiveRecord::Migration
  def change
    create_table :races do |t|
      t.integer :track_id, null: false

      t.timestamps null: false
    end

    add_index :races, :track_id
  end
end
