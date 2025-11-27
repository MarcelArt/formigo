package repositories

import (
	"github.com/MarcelArt/formigo/models"
	"gorm.io/gorm"
)

const formStepPageQuery = `
	select 
		*
	from form_steps t 
	where t.organization_id = ? 
`

type IFormStepRepo interface {
	IOrgCrudRepo[models.FormStep, models.FormStepDTO, models.FormStepPage]
}

type FormStepRepo struct {
	OrgCrudRepo[models.FormStep, models.FormStepDTO, models.FormStepPage]
}

func NewFormStepRepo(db *gorm.DB) *FormStepRepo {
	return &FormStepRepo{
		OrgCrudRepo: OrgCrudRepo[models.FormStep, models.FormStepDTO, models.FormStepPage]{
			db:        db,
			pageQuery: formStepPageQuery,
		},
	}
}
