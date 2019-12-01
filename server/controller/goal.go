package controller

import (
	"net/http"

	"github.com/server/model"
	// "time"
)

type goal struct{}

type user_goals struct {
	User []string
}

func (a goal) registerRoutes() {
	// Add Goal
	router.POST("/api/addGoal", a.AddGoal)
	// Get Goals
	router.GET("/api/getGoals", a.GetGoals)
	// Delete Goal
	router.POST("/api/deleteGoal", a.DeleteGoal)
}

func (a goal) AddGoal(w http.ResponseWriter, r *http.Request) {
	goal := r.FormValue("goal")

	model.AddGoal(goal)

	SendJson(w, "Added Goal", nil, 1)
}

func (a goal) GetGoals(w http.ResponseWriter, r *http.Request) {
	goals, err := model.GetGoals()

	if err != nil {
		SendJson(w, nil, err, 0)
		return
	}

	SendJson(w, goals, nil, 1)
}

func (a goal) DeleteGoal(w http.ResponseWriter, r *http.Request) {
	uid := r.FormValue("uid")

	err := model.DeleteGoal(uid)
	if err != nil {
		SendJson(w, nil, err, 0)
		return
	}

	CheckErr(err)

	SendJson(w, nil, "Goal Deleted", 1)
}
