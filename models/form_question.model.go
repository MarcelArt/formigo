package models

import "gorm.io/gorm"

const formQuestionTableName = "form_questions"

type FormQuestion struct {
	gorm.Model
	Label   string `gorm:"not null" json:"label"`
	Key     string `gorm:"not null" json:"key"`
	Type    string `gorm:"not null" json:"type"`
	Options string `json:"options"`

	StepID         uint `gorm:"not null" json:"stepId"`
	OrganizationID uint `gorm:"not null" json:"organizationId"`

	Step         *FormStep     `json:"step,omitzero"`
	Organization *Organization `json:"organization,omitzero"`
}

type FormQuestionDTO struct {
	DTO
	Label   string `gorm:"not null" json:"label"`
	Key     string `gorm:"not null" json:"key"`
	Type    string `gorm:"not null" json:"type"`
	Options string `json:"options"`

	StepID         uint `gorm:"not null" json:"stepId"`
	OrganizationID uint `gorm:"not null" json:"organizationId"`
}

type FormQuestionPage struct {
	ID      uint   `json:"ID"`
	Label   string `gorm:"not null" json:"label"`
	Key     string `gorm:"not null" json:"key"`
	Type    string `gorm:"not null" json:"type"`
	Options string `json:"options"`

	StepID         uint `gorm:"not null" json:"stepId"`
	OrganizationID uint `gorm:"not null" json:"organizationId"`
}

func (FormQuestionDTO) TableName() string {
	return formQuestionTableName
}
