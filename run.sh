docker build -t react-docker:dev .

docker run -v ${PWD}:/app -v /app/node_modules -p 3000:3000 --rm react-docker:dev
