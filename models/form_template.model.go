package models

import (
	"time"

	"gorm.io/gorm"
)

const formTemplateTableName = "form_templates"

type FormTemplate struct {
	gorm.Model
	Title       string `gorm:"not null" json:"title"`
	Description string `gorm:"not null" json:"description"`

	OrganizationID uint `gorm:"not null" json:"organizationId"`
	UserID         uint `gorm:"not null" json:"userId"`

	Organization *Organization `json:"organization,omitzero"`
	User         *User         `json:"user,omitzero"`
}

type FormTemplateDTO struct {
	DTO
	Title       string `gorm:"not null" json:"title"`
	Description string `gorm:"not null" json:"description"`

	OrganizationID uint `gorm:"not null" json:"organizationId"`
	UserID         uint `gorm:"not null" json:"userId"`
}

type FormTemplatePage struct {
	ID          uint      `gorm:"primarykey" json:"ID"`
	Title       string    `gorm:"not null" json:"title"`
	Description string    `gorm:"not null" json:"description"`
	CreatedBy   string    `json:"createdBy"`
	CreatedAt   time.Time `json:"CreatedAt"`
	UpdatedAt   time.Time `json:"UpdatedAt"`
}

func (FormTemplateDTO) TableName() string {
	return formTemplateTableName
}
