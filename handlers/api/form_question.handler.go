package api_handlers

import (
	"github.com/MarcelArt/formigo/models"
	"github.com/MarcelArt/formigo/repositories"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type FormQuestionHandler struct {
	OrgCrudHandler[models.FormQuestion, models.FormQuestionDTO, models.FormQuestionPage]
	repo repositories.IFormQuestionRepo
}

func NewFormQuestionHandler(repo repositories.IFormQuestionRepo) *FormQuestionHandler {
	return &FormQuestionHandler{
		OrgCrudHandler: OrgCrudHandler[models.FormQuestion, models.FormQuestionDTO, models.FormQuestionPage]{
			repo:      repo,
			validator: validator.New(validator.WithRequiredStructEnabled()),
		},
		repo: repo,
	}
}

// Create creates a new form question
// @Summary Create a new form question
// @Description Create a new form question
// @Tags FormQuestion
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param org_id path string true "Organization ID"
// @Param FormQuestion body models.FormQuestionDTO true "FormQuestion data"
// @Success 201 {object} models.FormQuestionDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /{org_id}/form-question [post]
func (h *FormQuestionHandler) Create(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Create(c)
}

// Read retrieves a list of form questions
// @Summary Get a list of form questions
// @Description Get a list of form questions
// @Tags FormQuestion
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param org_id path string true "Organization ID"
// @Param page query int false "Page"
// @Param size query int false "Size"
// @Param sort query string false "Sort"
// @Param filters query string false "Filter"
// @Success 200 {array} models.FormQuestionPage
// @Router /{org_id}/form-question [get]
func (h *FormQuestionHandler) Read(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Read(c)
}

// Update updates an existing form question
// @Summary Update an existing form question
// @Description Update an existing form question
// @Tags FormQuestion
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "FormQuestion ID"
// @Param org_id path string true "Organization ID"
// @Param FormQuestion body models.FormQuestionDTO true "FormQuestion data"
// @Success 200 {object} models.FormQuestionDTO
// @Failure 400 {object} string
// @Failure 500 {object} string
// @Router /{org_id}/form-question/{id} [put]
func (h *FormQuestionHandler) Update(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Update(c)
}

// Delete deletes an existing form question
// @Summary Delete an existing form question
// @Description Delete an existing form question
// @Tags FormQuestion
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "FormQuestion ID"
// @Param org_id path string true "Organization ID"
// @Success 200 {object} models.FormQuestion
// @Failure 500 {object} string
// @Router /{org_id}/form-question/{id} [delete]
func (h *FormQuestionHandler) Delete(c *fiber.Ctx) error {
	return h.OrgCrudHandler.Delete(c)
}

// GetByID retrieves a form question by ID
// @Summary Get a form question by ID
// @Description Get a form question by ID
// @Tags FormQuestion
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path string true "FormQuestion ID"
// @Param org_id path string true "Organization ID"
// @Success 200 {object} models.FormQuestion
// @Failure 500 {object} string
// @Router /{org_id}/form-question/{id} [get]
func (h *FormQuestionHandler) GetByID(c *fiber.Ctx) error {
	return h.OrgCrudHandler.GetByID(c)
}
