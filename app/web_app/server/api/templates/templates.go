package templates

import "html/template"

var Templates *template.Template

func Init() {
	Templates = template.Must(template.ParseGlob("api/templates/*.html"))
}