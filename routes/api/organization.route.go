package api_routes

import (
	"github.com/MarcelArt/formigo/database"
	api_handlers "github.com/MarcelArt/formigo/handlers/api"
	"github.com/MarcelArt/formigo/middlewares"
	"github.com/MarcelArt/formigo/repositories"
	"github.com/gofiber/fiber/v2"
)

func SetupOrganizationRoutes(api fiber.Router, auth *middlewares.AuthMiddleware) {
	h := api_handlers.NewOrganizationHandler(repositories.NewOrganizationRepo(database.GetDB()))

	g := api.Group("/organization")
	g.Get("/", auth.ProtectedAPI, h.Read)
	g.Get("/:id", auth.ProtectedAPI, auth.Authz("organization#view"), h.GetByID)
	g.Post("/", auth.ProtectedAPI, h.Create)
	g.Put("/:id", auth.ProtectedAPI, auth.Authz("organization#manage"), h.Update)
	g.Delete("/:id", auth.ProtectedAPI, auth.Authz("organization#manage"), h.Delete)
}
