class MazesController < ApplicationController

    def index
        mazes = Maze.all
        render json: mazes
    end
    
end
