
# User Authentication and Authorization

Crated this backend using nodejs,mongoose and expressjs and jwt 
with this api you can perform Authentication and Authorization of user,
in this api user can reset password he or she will receive password reset link,
for this i have use nodemailer, used JOI library for user validation 


## API Reference
to use this link pls install postman.

#### post file
copy the link provide below, create post request and 
paste it in postman and follow the Screenshots that i have provided

![App Screenshot](images/register.PNG)

```http
  post https://authentication-of-user.herokuapp.com/api/user/register
```
![App Screenshot](images/login.PNG)

```http
  post https://authentication-of-user.herokuapp.com/api/user/login
```
![App Screenshot](images/password-reset.PNG)
![App Screenshot](images/email_reset_link.PNG)

```http
  post https://authentication-of-user.herokuapp.com/api/password-reset
```
![App Screenshot](images/password-reset-done.PNG)
![App Screenshot](images/mongodb_data_new.PNG)

```

## Deployment

App is deployed on heroku.

```

