# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150122054636) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "race_entries", force: :cascade do |t|
    t.integer  "race_id",    null: false
    t.integer  "user_id",    null: false
    t.float    "wpm"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "race_entries", ["race_id", "user_id"], name: "index_race_entries_on_race_id_and_user_id", unique: true, using: :btree
  add_index "race_entries", ["race_id"], name: "index_race_entries_on_race_id", using: :btree
  add_index "race_entries", ["user_id"], name: "index_race_entries_on_user_id", using: :btree

  create_table "races", force: :cascade do |t|
    t.integer  "track_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "races", ["track_id"], name: "index_races_on_track_id", using: :btree

  create_table "tracks", force: :cascade do |t|
    t.text     "content",    null: false
    t.string   "title",      null: false
    t.string   "about",      null: false
    t.integer  "author_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "tracks", ["author_id"], name: "index_tracks_on_author_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "uid"
    t.string   "name"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "session_token"
    t.string   "nickname"
    t.string   "provider",      default: "facebook"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
