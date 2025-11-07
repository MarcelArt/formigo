package api_routes

import (
	"github.com/MarcelArt/formigo/database"
	api_handlers "github.com/MarcelArt/formigo/handlers/api"
	"github.com/MarcelArt/formigo/middlewares"
	"github.com/MarcelArt/formigo/repositories"
	"github.com/gofiber/fiber/v2"
)

func SetupUserRoleRoutes(api fiber.Router, auth *middlewares.AuthMiddleware) {
	h := api_handlers.NewUserRoleHandler(repositories.NewUserRoleRepo(database.GetDB()))

	g := api.Group("/user-role")
	g.Get("/", auth.ProtectedAPI, h.Read)
	g.Get("/:id", auth.ProtectedAPI, h.GetByID)
	g.Post("/", auth.ProtectedAPI, h.Create)
	g.Put("/:id", auth.ProtectedAPI, h.Update)
	g.Delete("/:id", auth.ProtectedAPI, h.Delete)
}
