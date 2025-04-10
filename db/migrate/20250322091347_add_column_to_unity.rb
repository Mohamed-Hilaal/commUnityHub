class AddColumnToUnity < ActiveRecord::Migration[7.0]
  def change
    add_reference :unities, :creator, foreign_key: { to_table: :users }, null: false, index: true
  end
end
