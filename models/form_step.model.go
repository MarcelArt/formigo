package models

import "gorm.io/gorm"

const formStepTableName = "form_steps"

type FormStep struct {
	gorm.Model
	Title string `gorm:"not null" json:"title"`
	Index uint   `gorm:"not null;default:0" json:"index"`

	TemplateID     uint `gorm:"not null" json:"templateId"`
	OrganizationID uint `gorm:"not null" json:"organizationId"`

	Template     *FormTemplate `json:"template,omitzero"`
	Organization *Organization `json:"organization,omitzero"`
}

type FormStepDTO struct {
	DTO
	Title string `gorm:"not null" json:"title"`
	Index uint   `gorm:"not null;default:0" json:"index"`

	TemplateID     uint `gorm:"not null" json:"templateId"`
	OrganizationID uint `gorm:"not null" json:"organizationId"`
}

type FormStepPage struct {
	ID    uint   `json:"ID"`
	Title string `gorm:"not null" json:"title"`
	Index uint   `gorm:"not null;default:0" json:"index"`

	TemplateID     uint `gorm:"not null" json:"templateId"`
	OrganizationID uint `gorm:"not null" json:"organizationId"`
}

func (FormStepDTO) TableName() string {
	return formStepTableName
}
