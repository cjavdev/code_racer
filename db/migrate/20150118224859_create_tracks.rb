class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.text :content, null: false
      t.string :title, null: false
      t.string :about, null: false
      t.integer :author_id, null: false

      t.timestamps null: false
    end

    add_index :tracks, :author_id
  end
end
