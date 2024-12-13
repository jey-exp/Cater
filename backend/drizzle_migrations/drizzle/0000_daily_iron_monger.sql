-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "signin" (
	"name" varchar(30),
	"email" varchar(40),
	"phone" integer,
	"pass" text,
	"role" varchar(30)
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"cateremail" varchar(50),
	"customeremail" varchar(50),
	"price" integer,
	"orderdate" date DEFAULT CURRENT_DATE,
	"catername" varchar(30)
);
--> statement-breakpoint
CREATE TABLE "cater" (
	"name" varchar(30),
	"location" varchar(50),
	"about" text,
	"price" integer,
	"email" varchar(40),
	"pass" text,
	"complete" boolean
);
--> statement-breakpoint
CREATE TABLE "ordertable_testuser" (
	"id" serial PRIMARY KEY NOT NULL,
	"catername" varchar(40),
	"amount" integer,
	"order_date" date DEFAULT CURRENT_DATE
);
--> statement-breakpoint
CREATE TABLE "catermenu" (
	"catername" varchar(30),
	"food" varchar(40),
	"proteins" integer,
	"fat" integer,
	"calorie" integer,
	"price" integer,
	"time" varchar(30),
	"email" varchar(50)
);

*/