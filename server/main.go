package main

import (
	"log"
	"net/http"

	"github.com/sumohammed/GzipMiddleWare"
	//	"model"
	"github.com/server/controller"
	"github.com/server/model"
)

func main() {
	db := model.InitDb()
	defer db.Close()

	controller.Startup()

	GzipMiddleWare := new(GzipMiddleWare.MiddleWare)

	log.Println(http.ListenAndServe(":8080", GzipMiddleWare))

}
