class CreateUnityChatMemberships < ActiveRecord::Migration[7.0]
  def change
    create_table :unity_chat_memberships do |t|

      t.references :unity_chat, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    # Ensure a user can't be in the same chat twice
    add_index :unity_chat_memberships, [:unity_chat_id, :user_id], unique: true
  end
end
