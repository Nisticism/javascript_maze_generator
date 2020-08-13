class User < ApplicationRecord
    has_many :scores
    has_many :mazes, through: :scores

    validates :username, length: { in: 3..20 }
end
