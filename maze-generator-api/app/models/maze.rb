class Maze < ApplicationRecord

    has_many :scores
    has_many :users, through: :scores

    belongs_to :creator, class_name: "User", foreign_key: "user_id"

    accepts_nested_attributes_for :scores

    validates :width, numericality: { only_integer: true }
    validates :height, numericality: { only_integer: true }
    validates :coins, numericality: { only_integer: true }

    validates_inclusion_of :width, :in => 20..60
    validates_inclusion_of :height, :in => 20..60
    validates_inclusion_of :coins, :in => 0..100

end
