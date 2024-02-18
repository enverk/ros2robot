package middlewares

import (
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func Authorize(next echo.HandlerFunc) echo.HandlerFunc{
	return func(c echo.Context) error{
		authHeader:=c.Request().Header.Get("Authorization")
		if authHeader!=""{
			tokenHeader:=authHeader[len("Bearer "):]

			token,err:=jwt.Parse(tokenHeader,func(token *jwt.Token) (interface{},error ){
				if _, ok:=token.Method.(*jwt.SigningMethodHMAC); !ok{
					return nil, echo.ErrUnauthorized
				}
				return jwtKey,nil
			})
			if err==nil&&token.Valid{
				if claims,ok:=token.Claims.(jwt.MapClaims); ok && token.Valid{
					sub:=int(claims["sub"].(float64))
					if sub!=1{
						return echo.ErrForbidden
					}
					return next(c)
				}
			}
		}
		cookie, _:=c.Cookie("access_token")
		if cookie != nil {
			tokenCookie :=cookie.Value

			token, err:=jwt.Parse(tokenCookie,func(token *jwt.Token) (interface{},error){
				if _, ok:=token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("error occured at authorization")
				}
				return jwtKey, nil
			})

			if err==nil&&token.Valid{
				if claims, ok:=token.Claims.(jwt.MapClaims); ok && token.Valid{
					sub:=claims["sub"].(float64)
					if sub!=1{
						return echo.ErrUnauthorized
					}
					return next(c)

				}

			}
		}
		return echo.ErrUnauthorized
	}
}