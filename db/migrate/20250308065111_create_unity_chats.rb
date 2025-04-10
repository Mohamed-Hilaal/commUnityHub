class CreateUnityChats < ActiveRecord::Migration[7.0]
  def change
    create_table :unity_chats do |t|

      t.timestamps
    end
  end
end
