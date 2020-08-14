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

maze_a = Maze.create(width: 20, height: 20, coins: 20, user_id: test_user.id)
maze_b = Maze.create(width: 25, height: 25, coins: 25, user_id: test_user.id)
maze_c = Maze.create(width: 30, height: 30, coins: 30, user_id: test_user.id)
maze_d = Maze.create(width: 35, height: 35, coins: 35, user_id: test_user.id)
maze_e = Maze.create(width: 40, height: 40, coins: 40, user_id: test_user.id)

