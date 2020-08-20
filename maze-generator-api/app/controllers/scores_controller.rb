class ScoresController < ApplicationController

    def index
        scores = Score.all
        render json: scores
    end

    def show
        score = Score.find(params[:id])
        render json: score
    end

    def create
        if (params[:user_id] && params[:maze_id])
            user = User.find_by(id: params[:user_id])
            maze = Maze.find_by(id: params[:maze_id])
            score = user.scores.build(time: params[:time], username: user.username)
            maze.scores << score
        end
    end

end
