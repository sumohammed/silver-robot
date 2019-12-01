package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Response struct {
	Data    interface{} `json:"data"`
	Status  int         `json:"status"`
	Message interface{} `json:"message"`
}

var (
	goalController goal
)

// Declare router
var router = Router{}

func Startup() {
	goalController.registerRoutes()
}

func SendJson(w http.ResponseWriter, val interface{}, message interface{}, status int) {
	w.Header().Add("Content-Type", "application/x-javascript; charset=utf-8")

	res := Response{
		Data:    val,
		Status:  status,
		Message: fmt.Sprint(message),
	}

	formatted, _ := json.Marshal(res)
	w.Write(formatted)
}

func CheckErr(err error) {
	if err != nil {
		log.Println(err)
	}
}
