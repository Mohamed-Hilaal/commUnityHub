# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2025_02_16_064556) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "account_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer "priority", default: 0, null: false
    t.integer "attempts", default: 0, null: false
    t.text "handler", null: false
    t.text "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string "locked_by"
    t.string "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.bigint "unity_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["unity_id"], name: "index_posts_on_unity_id"
  end

  create_table "unities", force: :cascade do |t|
    t.string "community_name", null: false
    t.string "location"
    t.string "category", null: false
    t.string "audience", null: false
    t.text "community_description", null: false
    t.string "contact_method", null: false
    t.text "community_vision", null: false
    t.text "goals", null: false
    t.text "long_term_objectives", null: false
    t.boolean "current_interest"
    t.text "content_and_activities"
    t.string "commitment_level", null: false
    t.text "differentiation"
    t.text "potential_challenges"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "unities_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "unity_id", null: false
    t.index ["unity_id"], name: "index_unities_users_on_unity_id"
    t.index ["user_id"], name: "index_unities_users_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "username", null: false
    t.string "full_name"
    t.string "profile_picture"
    t.string "google_id", null: false
    t.string "password_hash"
    t.bigint "account_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "current_unity_id"
    t.index ["account_id"], name: "index_users_on_account_id"
    t.index ["current_unity_id"], name: "index_users_on_current_unity_id"
  end

  add_foreign_key "posts", "unities"
  add_foreign_key "users", "accounts"
  add_foreign_key "users", "unities", column: "current_unity_id"
end
