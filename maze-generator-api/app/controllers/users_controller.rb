class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def new
        user = User.new
    end

    def create
        @user = User.create(username: params[:username])
    end

    def find_or_create
        if (User.find_by(username: params[:username]))
            user = User.find_by(username: params[:username])
            render json: user
        else
            user = User.new(username: params[:username])
            user.save
            if (User.find_by(username: params[:username]))
                render json: user
            end
        end
        # user = User.find_or_create_by(username: params[:username])
        # render json: user
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

end
