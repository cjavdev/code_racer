class AddProviderToUsers < ActiveRecord::Migration
  def change
    add_column :users, :provider, :string, default: 'facebook'
  end
end
