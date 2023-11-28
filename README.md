APP CHAT API

# API

    - test API:             [GET] http://localhost:3200/api/...

    - test users route:     [GET] http://localhost:3200/api/users/...
    - register:             [POST] http://localhost:3200/api/users/register
    - login:                [POST] http://localhost:3200/api/users/login
    - my profile:           [GET] http://localhost:3200/api/users/profile
    - delete:               [DELETE] http://localhost:3200/api/users/delete/:id
    - update:               [PUT] http://localhost:3200/api/users/update/:id
    - get user:             [GET] http://localhost:3200/api/users/getUserById
    - get all users:        [GET] http://localhost:3200/api/users/getAllUsers

    - create message:       [POST] http://localhost:3200/api/messages/
    - get message:          [GET] http://localhost:3200/api/messages/:id

    - create chat:          [POST] http://localhost:3200/api/chats/
    - find user chat:       [GET] http://localhost:3200/api/chats/:id
    - find chat:            [GET] http://localhost:3200/api/chats/find/:firstId/:secondId

## run

    - dev: npm run dev

### init

    - npm init -y
    - npm install express socket.io mongoose
