class ScoreSerializer < ActiveModel::Serializer
    attributes :id, :time, :created_at
    belongs_to :maze
    belongs_to :user
end