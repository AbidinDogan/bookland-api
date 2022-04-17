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
