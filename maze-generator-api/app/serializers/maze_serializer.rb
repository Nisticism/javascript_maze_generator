class MazeSerializer < ActiveModel::Serializer
    attributes :width, :height, :coins
    has_many :scores
    has_many :users, through: :scores
end