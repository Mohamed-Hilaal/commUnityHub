class ModifyUnityCreatorForeignKey < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :unities, :users, column: :creator_id
    add_foreign_key :unities, :users, column: :creator_id, on_delete: :nullify
  end
end
