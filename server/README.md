## Docker

Bygge: docker build . -t trymon/tdt4290-server
Kjøre: docker run -e MONGO_URL=mongodb://10.24.33.166/trips -e API_KEY=17b0a9343546a976ff0b1d0a5410adb4 -e PORT=5000 -p 5000:5000 -it trymon/tdt4290-server

Publisere: docker push trymon/tdt4290-server

Laster ikke inn fixtures...

mongo kjøres på utsiden, kanskje med docker-compose???

Det finnes en compose fil, docker-compose up -d for kjøring i bakgrunnen 
