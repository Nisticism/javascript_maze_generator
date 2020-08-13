class ScoreSerializer < ActiveModel::Serializer
    attributes :time
    belongs_to :maze
    belongs_to :user
end