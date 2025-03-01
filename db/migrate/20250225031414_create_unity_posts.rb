class CreateUnityPosts < ActiveRecord::Migration[7.0]
  def change
    create_table :unity_posts do |t|

      t.text :content
      t.references :unity, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
