class ScoreSerializer < ActiveModel::Serializer
    attributes :id, :time, :username, :user_id, :maze_id, :created_at
    belongs_to :maze
    belongs_to :user
end