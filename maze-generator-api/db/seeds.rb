# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Maze.delete_all
User.delete_all

test_user = User.create(username: "Test-User")

maze_a = Maze.create(width: 30, height: 30, 
coins: "200 200", 
paths: "60 60 70 70 80 80 90 90 300 40 50 50 60 60 70 70 80 80 90 90 100 100", 
user_id: test_user.id)
maze_a.save

maze_b = Maze.create(width: 35, height: 35, 
coins: "200 200", 
paths: "60 60 70 70 80 80 90 90 300 40 50 50 60 60 70 70 80 80 90 90 100 100",
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

score_a = Score.create(time: "10", username: "Test-User", user_id: 1, maze_id: 2)

