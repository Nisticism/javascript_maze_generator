class UserSerializer < ActiveModel::Serializer
    attributes :id, :username, :created_at
    has_many :scores
    has_many :mazes, through: :scores
end