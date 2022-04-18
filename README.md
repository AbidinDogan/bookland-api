# Description

This project is just an example of NodeJs. Simply we are going to create an API that will allow us to do CRUD operations on PostgreSQL. The steps are as follows: 

1. Install docker desktop.
2. Create a PostgreSQL container with custom settings.
3. Create database tables.
4. Create a NodeJs API.

## 1. Install docker desktop.
If we don't want to deal with the installation of PostgreSQL or any kind of database or application. The only thing we need is to install the docker desktop and get an image of that application. That way we can run any container when we need. If we don't need them, we can keep them closed. You can download it from [here](https://docs.docker.com/desktop/windows/install/). 

## 2. Create a PostgreSQL container with custom settings.
Before we create our PostgreSQL container we need an image of it. When your docker desktop is running, execute the following command on PowerShell.
```bash
docker pull postgres
```
When it is completed we are ready to create our PostgreSQL container. Execute the following command on PowerShell.

```bash
docker run --name docker_postgres -e POSTGRES_PASSWORD=pass456 -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres
```
Now we have a PostgreSQL container. We can connect to it with the following information; 
* "host": "localhost",
* "port": "5432",
* "userName": "postgres",
* "password": "pass456"

You can use your favorite IDE. I prefer to use DBeaver. You can download it from [here](https://dbeaver.io/download/).

## 3. Create database tables.
Open a script tab for SQL scripts or you can do it with GUI. Create a database for our project with the following script.

```sql
create database bookland;
```
When it is created connect to the bookland database and open a new script tab so we can create our tables. We need three tables; authors, publishers, and books. Use the following script to create tables and insert a few examples.

```sql
CREATE TABLE public."Publishers" (
	"id" int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(300) NOT NULL,
	"address" varchar(300) NULL,
	CONSTRAINT publishers_pk PRIMARY KEY (id)
);

CREATE TABLE public."Authors" (
	"id" int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"firstName" varchar(100) NOT NULL,
	"lastName" varchar(100) NOT NULL,
	CONSTRAINT authors_pk PRIMARY KEY ("id")
);

CREATE TABLE public."Books" (
	"id" int8 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(300) NOT NULL,
	"publishDate" date NOT NULL,
	"authorId" int8 NOT NULL,
	"publisherId" int8 NOT NULL,
	
	CONSTRAINT books_pk PRIMARY KEY ("id"),	
	CONSTRAINT books_to_authors_fk FOREIGN KEY ("authorId") REFERENCES public."Authors"("id"),
	CONSTRAINT books_to_publishers_fk_1 FOREIGN KEY ("publisherId") REFERENCES public."Publishers"("id")
);

--insert a few publishers--
INSERT INTO public."Publishers" ("name", "address") VALUES('Fetza pub co', 'Fetza street 15/2, Nidavellir');
INSERT INTO public."Publishers" ("name", "address") VALUES('Owl pub co', 'Owl street 3, Asgard');
INSERT INTO public."Publishers" ("name", "address") VALUES('Derman pub co', 'Derman street 7, Nilfheim');
INSERT INTO public."Publishers" ("name", "address") VALUES('Grass pub co', 'Grass street 1/1, Barssom');

--insert a few authors--
INSERT INTO public."Authors" ("firstName", "lastName") VALUES('Firgena', 'Flangee');
INSERT INTO public."Authors" ("firstName", "lastName") VALUES('Elijah', 'Norsman');
INSERT INTO public."Authors" ("firstName", "lastName") VALUES('James', 'Flicker');

--insert a few books--
INSERT INTO public."Books" ("name", "publishDate", "authorId", "publisherId") VALUES('No Way To Hell', '2021-01-12', 1, 4);
INSERT INTO public."Books" ("name", "publishDate", "authorId", "publisherId") VALUES('Being Human', '2022-02-07', 1, 3);
INSERT INTO public."Books" ("name", "publishDate", "authorId", "publisherId") VALUES('Mind Flare', '2022-04-16', 2, 1);
INSERT INTO public."Books" ("name", "publishDate", "authorId", "publisherId") VALUES('Nodeman To The Rescue', '2020-02-23', 3, 2);
INSERT INTO public."Books" ("name", "publishDate", "authorId", "publisherId") VALUES('Nitz', '2022-08-29', 3, 4);
```
Now the database part is done.

## 4. Create a NodeJs API.
Create a folder for the project and navigate yourself to that directory. You can clone this repository or you create it yourself. The project structure will look like down below.


![project structure](https://github.com/AbidinDogan/bookland-api/blob/main/projectStructure.png)

We will do the heavy lifting in services. Controllers will be using these services. Routers will help us to navigate. 
Before the start make sure you have updated the config file (default.json) with the information you have. To start the project:
```bash
cd bookland-api
npm install
cd src
node server.js
```
Now the application is running on port 3000. You can check it with the http://localhost:3000/

## License
MIT License

Copyright (c) 2022 bookland-api

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
