## Docker

Bygg js først siden side serveres med nginx: npm run build
Bugg docker: docker build . -t trymon/tdt4290-client:latest
Kjør: docker run -p 3000:80 -t trymon/tdt4290-client:latest
Push: docker push trymon/tdt4290-client:latest
