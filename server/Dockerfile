# pull the official base image
FROM python:3.9.0-slim-buster

# set the working directory
WORKDIR /usr/src/app

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip3 install -r requirements.txt

# add app
COPY . .

# start app
CMD ["python3","app.py"]