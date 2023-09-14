FROM golang:1.18

WORKDIR /go/src/359

COPY . .
COPY .env.docker .env


RUN go mod vendor
RUN go build -ldflags="-s -w" -mod=vendor

CMD "./359"

