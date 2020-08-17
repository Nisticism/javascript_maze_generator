class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def new
        @user = User.new
    end

    def create
        user = User.find_or_create_by(username: params[:username])
        if user.save
            session[:user_id] = user.id
        end
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

end
