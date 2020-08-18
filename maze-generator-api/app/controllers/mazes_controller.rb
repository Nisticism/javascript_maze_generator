class MazesController < ApplicationController

    def index
        mazes = Maze.all
        render json: mazes
    end

    def show
        maze = Maze.find(params[:id])
        render json: maze
    end

    def create
        maze = Maze.new(width: params[:width], height: params[:height], coins: params[:coins], 
        paths: params[:paths], user_id: params[:user_id])
        if maze.save
            render json: maze
        else
            {message: maze.errors.messages[:maze_creation][0]}
        end
    end

    def destroy
        maze = Maze.find(params[:id])
        if params[:username] == maze.creator.username
            maze.destroy
        else
            {message: maze.errors.messages[:maze_deletion][0]}
        end
    end


end
