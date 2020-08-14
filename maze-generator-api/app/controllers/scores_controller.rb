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
        score = Score.new(time: params[:time])
        score.save
    end

end
