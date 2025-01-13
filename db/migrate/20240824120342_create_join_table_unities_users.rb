class CreateJoinTableUnitiesUsers < ActiveRecord::Migration[7.0]
  def change
    create_join_table :users, :unities do |t|
      t.index :user_id
      t.index :unity_id
    end
  end
end
