class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email
      t.string :username, null: false, unique: true
      t.string :full_name
      t.string :profile_picture
      t.string :google_id, null: false, unique: true
      t.string :password_hash
      t.references :account, null: false, foreign_key: true
      t.timestamps
    end
  end
end
