class CreateUnity < ActiveRecord::Migration[7.0]
  def change
    create_table :unities do |t|
      t.string :community_name, null: false, unique: true
      t.string :location
      t.string :category, null: false
      t.string :audience, null: false
      t.text :community_description, null: false
      t.string :contact_method, null: false
      t.text :community_vision, null: false
      t.text :goals, null: false
      t.text :long_term_objectives, null: false
      t.boolean :current_interest
      t.text :content_and_activities
      t.string :commitment_level, null: false
      t.text :differentiation
      t.text :potential_challenges
      
      t.timestamps

    end
  end
end
