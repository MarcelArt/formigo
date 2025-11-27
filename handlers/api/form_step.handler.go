package api_handlers

import (
	"github.com/MarcelArt/formigo/models"
	"github.com/MarcelArt/formigo/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type FormStepHandler struct {
	OrgCrudHandler[models.FormStep, models.FormStepDTO, models.FormStepPage]
	repo repositories.IFormStepRepo
}

func NewFormStepHandler(repo repositories.IFormStepRepo) *FormStepHandler {
	return &FormStepHandler{
		OrgCrudHandler: OrgCrudHandler[models.FormStep, models.FormStepDTO, models.FormStepPage]{
			repo:      repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new form step
// @Summary Create a new form step
// @Description Create a new form step
// @Tags FormStep
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param org_id path string true "Organization ID"
// @Param FormStep body models.FormStepDTO true "FormStep data"
// @Success 201 {object} models.FormStepDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /{org_id}/form-step [post]
func (h *FormStepHandler) Create(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Create(c)
}

// Read retrieves a list of form steps
// @Summary Get a list of form steps
// @Description Get a list of form steps
// @Tags FormStep
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param org_id path string true "Organization ID"
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.FormStepPage
// @Router /{org_id}/form-step [get]
func (h *FormStepHandler) Read(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Read(c)
}

// Update updates an existing form step
// @Summary Update an existing form step
// @Description Update an existing form step
// @Tags FormStep
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "FormStep ID"
// @Param org_id path string true "Organization ID"
// @Param FormStep body models.FormStepDTO true "FormStep data"
// @Success 200 {object} models.FormStepDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /{org_id}/form-step/{id} [put]
func (h *FormStepHandler) Update(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Update(c)
}

// Delete deletes an existing form step
// @Summary Delete an existing form step
// @Description Delete an existing form step
// @Tags FormStep
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "FormStep ID"
// @Param org_id path string true "Organization ID"
// @Success 200 {object} models.FormStep
// @Failure 500 {object} string
// @Router /{org_id}/form-step/{id} [delete]
func (h *FormStepHandler) Delete(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Delete(c)
}

// GetByID retrieves a form step by ID
// @Summary Get a form step by ID
// @Description Get a form step by ID
// @Tags FormStep
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "FormStep ID"
// @Param org_id path string true "Organization ID"
// @Success 200 {object} models.FormStep
// @Failure 500 {object} string
// @Router /{org_id}/form-step/{id} [get]
func (h *FormStepHandler) GetByID(c *fiber.Ctx) error {
	return h.OrgCrudHandler.GetByID(c)
}
