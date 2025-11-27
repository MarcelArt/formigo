package repositories

import (
	"github.com/MarcelArt/formigo/models"
	"gorm.io/gorm"
)

const formQuestionPageQuery = `
	select 
		*
	from form_questions fq 
	where fq.organization_id = ?
	and fq.deleted_at isnull
`

type IFormQuestionRepo interface {
	IOrgCrudRepo[models.FormQuestion, models.FormQuestionDTO, models.FormQuestionPage]
}

type FormQuestionRepo struct {
	OrgCrudRepo[models.FormQuestion, models.FormQuestionDTO, models.FormQuestionPage]
}

func NewFormQuestionRepo(db *gorm.DB) *FormQuestionRepo {
	return &FormQuestionRepo{
		OrgCrudRepo: OrgCrudRepo[models.FormQuestion, models.FormQuestionDTO, models.FormQuestionPage]{
			db:        db,
			pageQuery: formQuestionPageQuery,
		},
	}
}
