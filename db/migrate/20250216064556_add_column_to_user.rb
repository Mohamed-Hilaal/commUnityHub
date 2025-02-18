class AddColumnToUser < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :current_unity, foreign_key: { to_table: :unities }
  end
end
