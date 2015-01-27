class AddGetsNotificationsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :gets_notifications, :boolean, default: true
  end
end
