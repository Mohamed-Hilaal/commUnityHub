# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'csv'

# Seed Accounts
# csv_file = Rails.root.join('db', './csv/Accounts.csv')
# CSV.foreach(csv_file, headers: true) do |row|
#   Account.create!(account_type: row['account_type'])
# end
# puts "Accounts seeded!"

# Seed Users
# csv_file = Rails.root.join('db', './csv/Users.csv')
# CSV.foreach(csv_file, headers: true) do |row|
#   User.create!(
#     email: row['email'],
#     username: row['username'],
#     full_name: row['full_name'],
#     profile_picture: row['profile_picture'],
#     google_id: row['google_id'],
#     password_hash: row['password_hash'],
#     account_id: row['account_id'],
#     current_unity_id: row['current_unity_id'].presence
#   )
# end
# puts "Users seeded!"

# Seed Unity
# csv_file = Rails.root.join('db', 'csv', 'Unities.csv')

# CSV.foreach(csv_file, headers: true) do |row|
#   unity = Unity.new(
#     community_name: row['community_name'],
#     location: row['location'],
#     category: row['category'],
#     audience: row['audience'],
#     community_description: row['community_description'],
#     contact_method: row['contact_method'],
#     community_vision: row['community_vision'],
#     goals: row['goals'],
#     long_term_objectives: row['long_term_objectives'],
#     current_interest: row['current_interest'] == 'true',
#     content_and_activities: row['content_and_activities'],
#     commitment_level: row['commitment_level'],
#     differentiation: row['differentiation'],
#     potential_challenges: row['potential_challenges'],
#     creator_id: row['creator_id']
#   )

#   # Ensure the creator exists
#   user = User.find_by(id: row['creator_id'])
  
#   if user.nil?
#     puts "Skipping row: Creator with ID #{row['creator_id']} not found"
#     next
#   end

#   if unity.save 
#     unity.users << user

#     user.update!(current_unity_id: unity.id) 
#   else
#     puts "Skipping row due to errors: #{unity.errors.full_messages.join(', ')}"
#   end
# end

# puts "Unities seeded!"


# Seed Posts
csv_file = Rails.root.join('db', './csv/Posts.csv')
CSV.foreach(csv_file, headers: true) do |row|
  Post.create!(title: row['title'], content: row['content'], unity_id: row['unity_id'])
end
puts "Posts seeded!"

# Seed Unity Posts
# csv_file = Rails.root.join('db', './csv/UnityPosts.csv')
# CSV.foreach(csv_file, headers: true) do |row|
#   UnityPost.create!(content: row['content'], unity_id: row['unity_id'], user_id: row['user_id'])
# end
# puts "Unity Posts seeded!"

