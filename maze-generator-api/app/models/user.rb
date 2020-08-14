class User < ApplicationRecord
    has_many :scores
    has_many :mazes, through: :scores

    has_many :created_mazes, class_name: "Mazes"

    validates :username, length: { in: 3..20 }
end
