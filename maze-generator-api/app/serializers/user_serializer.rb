class UserSerializer < ActiveModel::Serializer
    attributes :username
    has_many :scores
    has_many :mazes, through: :scores
end