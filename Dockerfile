FROM httpd

COPY index.html /usr/local/apache2/htdocs
COPY app.js /usr/local/apache2/htdocs
COPY reset.css /usr/local/apache2/htdocs
COPY style.css /usr/local/apache2/htdocs



