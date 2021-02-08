# Chat Group application

## Fuctionality

- User story: By default, I am in Welcome channel
- User story: I can create a new channel with a name and a description
- User story: I can select a channel of my choice
- User story: When I can select a channel, I am added as a member of the channel
- User story: I can see member of the channel
- User story: I can send a message
- User story: I can see other people's messages
- User story(optional): I can search for a group

### Live demo:

[Image uploader app live](https://lit-citadel-94024.herokuapp.com/)

### Chat

![chat](/images/chatGroup.PNG)

## Technologies

### Backend

- Nodejs
- expressjs, mongoose
- Gridfs, multer (for image uploads)
- socket.io (for live chatting)

### Frontend

- Reactjs

## Development

- Add a config folder containing a default.json file with a mongoURI
- Install dependencies `npm install`
- Install client dependencies `npm run clientinstall`
- Run application `npm run dev`
