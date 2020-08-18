class MazeSerializer < ActiveModel::Serializer
    attributes :id, :width, :height, :coins, :paths, :created_at
    has_many :scores
    has_many :users, through: :scores
end