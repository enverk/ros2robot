package middlewares

import (
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func Authorize(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authHeader := c.Request().Header.Get("Authorization")
		fmt.Println("Header", authHeader)
		if authHeader != "" {
			tokenHeader := authHeader[len("Bearer "):]
			token, err := jwt.Parse(tokenHeader, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, echo.ErrUnauthorized
				}
				return jwtKey, nil
			})
			if err == nil && token.Valid {
				if claims, ok := token.Claims.(jwt.MapClaims); ok {
					email := claims["email"].(string)
					c.Set("email", email)
					return next(c)
				}
			}
		}
		// cookie, err := c.Cookie("access_token")
		// if err == nil && cookie != nil {
		// 	tokenCookie := cookie.Value
		// 	token, err := jwt.Parse(tokenCookie, func(token *jwt.Token) (interface{}, error) {
		// 		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		// 			return nil, echo.ErrUnauthorized
		// 		}
		// 		return jwtKey, nil
		// 	})
		// 	if err == nil && token.Valid {
		// 		if claims, ok := token.Claims.(jwt.MapClaims); ok {
		// 			email := claims["email"].(string)
		// 			c.Set("email", email)
		// 			return next(c)
		// 		}
		// 	}
		// }

		return echo.ErrUnauthorized
	}
}
func MobileAuthorize(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authHeader := c.Request().Header.Get("Authorization")
		if authHeader != "" {
			tokenHeader := authHeader[len("Bearer "):]
			token, err := jwt.Parse(tokenHeader, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, echo.ErrUnauthorized
				}
				return jwtKey, nil
			})
			if err == nil && token.Valid {
				if claims, ok := token.Claims.(jwt.MapClaims); ok {
					email := claims["email"].(string)
					c.Set("email", email)
					return next(c)
				}
			}
		}
		return echo.ErrUnauthorized
	}
}
