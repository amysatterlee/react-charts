docker build -t react-charts:dev .

docker run -v ${PWD}:/app -v /app/node_modules -p 3000:3000 --rm react-charts:dev
