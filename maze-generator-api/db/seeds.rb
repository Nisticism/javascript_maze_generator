# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Maze.delete_all
User.delete_all

test_user = User.create(username: "TestUser")
second_user = User.create(username: "SecondUser")

seed_a_paths =
  "80 40 50 70 60 80 0 60 10 60 20 60 30 60 40 60 60 0 60 10 60 20 60 30 70 30 80 30 90 30 100 30 110 40 120 50" +
  " 150 30 160 30 170 30 180 30 190 30 200 30 200 40 200 50 200 60 200 70 204 80 194 80 160 80" +
  " 150 80 140 80 150 80 150 70 150 60 150 50 150 40 250 0 250 10 250 20 250 30 250 40 250 50 250 60 250 70 250 80 250 90 250 100" +
  " 250 110 250 120 240 120 230 120 220 120 210 120 200 120 190 120 180 120 170 120 160 120 150 120 140 120" +
  " 100 90 100 100 100 110 100 120 100 130 100 140 100 150 100 160 100 170 100 180 100 190 100 200 100 210" +
  " 140 130 140 170 140 180 140 190 140 200 140 210 140 220 140 230 140 240 140 250 140 260" +
  " 100 220 90 220 80 220 70 220 60 220 50 220 40 220 30 220 30 230 30 240 30 250" +
  " 130 260 120 260 110 260 100 260 90 260 60 290 60 280 60 270" +
  " 140 170 150 170 160 170 170 170 180 160 180 160 190 160 200 160 210 160 220 160 230 160 240 160 250 160 260 160 270 160 280 160 290 160" +
  " 180 290 180 280 180 270 180 260 210 260 210 250 210 240 200 240 190 240 190 230 190 220 190 210" +
  " 230 170 230 180 230 190 230 200 240 200 250 200 260 200" + 
  " 90 120 80 120 70 120 60 120 50 120 40 120 30 120 0 160 10 160 20 160 30 160 40 160 50 160 60 160" + 
  " 60 170 60 180 25 210 25 200 220 240 230 240 240 240 250 240 260 240 260 120 290 80 260 40 240 30 200 260 190 260 190 250 150 210"

  seed_a_coins = "65 5 165 45 265 5 215 25 15 75 185 270"

  seed_b_paths =
  "0 60 10 60 20 60 30 60 40 60 60 0 60 10 60 20 60 30 70 30 80 30 80 40 80 50 80 60 80 70 80 110 80 120 80 130 80 140 80 150 70 130 90 110 100 110 110 110 120 110 " +
  "40 70 40 80 40 90 40 100 30 100 30 110 30 120 30 130 30 140 30 150 30 160 " +
  "120 100 120 90 120 80 120 70 120 60 120 50 120 40 120 30 120 20 120 10 120 0 " +
  "0 200 10 200 20 200 30 200 40 200 50 200 60 200 70 200 80 200 90 200 100 200 110 200 120 200 ";

  seed_b_coins = "15 72 70 2";

maze_a = Maze.create(width: 30, height: 30, 
coins: seed_a_coins, 
paths: seed_a_paths, 
user_id: test_user.id)

maze_b = Maze.create(width: 35, height: 35, 
coins: seed_b_coins, 
paths: seed_b_paths,
user_id: test_user.id)

maze_c = Maze.create(width: 50, height: 40, 
coins: "200 200", 
paths: "60 60 70 70 80 80 90 90 300 40 50 50 60 60 70 70 80 80 90 90 100 100",
user_id: test_user.id)

maze_d = Maze.create(width: 65, height: 55, 
coins: "200 200",
paths: "60 60 70 70 80 80 90 90 300 40 50 50 60 60 70 70 80 80 90 90 100 100",
user_id: test_user.id)

maze_e = Maze.create(width: 80, height: 60, 
coins: "200 200", 
paths: "60 60 70 70 80 80 90 90 300 40 50 50 60 60 70 70 80 80 90 90 100 100",
user_id: test_user.id)

score_a = Score.create(time: "10.0", username: test_user.username, user_id: 1, maze_id: 1)
score_b = Score.create(time: "9.2", username: test_user.username, user_id: 1, maze_id: 2)
score_c = Score.create(time: "8.5", username: "SecondUser", user_id: 2, maze_id: 1)
score_d = Score.create(time: "7.2", username: "TestUser", user_id: 1, maze_id: 2)

