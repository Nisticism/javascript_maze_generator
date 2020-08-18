class ScoreSerializer < ActiveModel::Serializer
    attributes :id, :time, :created_at, :user_id, :maze_id
    belongs_to :maze
    belongs_to :user
end