class AddCheaterToUsers < ActiveRecord::Migration
  def change
    add_column :users, :cheater, :boolean, default: false
  end
end
