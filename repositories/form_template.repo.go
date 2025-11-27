package repositories

import (
	"github.com/MarcelArt/formigo/models"
	"gorm.io/gorm"
)

const formTemplatePageQuery = `
	select
		ft.id id,
		ft.title title,
		ft.description description,
		u.username created_by,
		ft.created_at created_at,
		ft.updated_at updated_at
	from form_templates ft 
	join users u on ft.user_id = u.id 
	where ft.organization_id = ?
	and ft.deleted_at isnull
`

type IFormTemplateRepo interface {
	IOrgCrudRepo[models.FormTemplate, models.FormTemplateDTO, models.FormTemplatePage]
}

type FormTemplateRepo struct {
	OrgCrudRepo[models.FormTemplate, models.FormTemplateDTO, models.FormTemplatePage]
}

func NewFormTemplateRepo(db *gorm.DB) *FormTemplateRepo {
	return &FormTemplateRepo{
		OrgCrudRepo: OrgCrudRepo[models.FormTemplate, models.FormTemplateDTO, models.FormTemplatePage]{
			db:        db,
			pageQuery: formTemplatePageQuery,
		},
	}
}
