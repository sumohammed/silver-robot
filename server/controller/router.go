package controller

import (
	"net/http"
)

type Router struct{}

func (r Router) GET(path string, h http.HandlerFunc) {

	http.HandleFunc(path, func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "GET" {
			h(w, r)
		} else {
			http.NotFound(w, r)
			return
		}
	})

}

func (r Router) POST(path string, h http.HandlerFunc) {

	http.HandleFunc(path, func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			h(w, r)
		} else {
			http.NotFound(w, r)
			return
		}
	})

}
