class CreateStages < ActiveRecord::Migration
  def change
    create_table :stages do |t|
      t.integer :owner_id
      t.string :token

      t.timestamps null: false
    end
  end
end
