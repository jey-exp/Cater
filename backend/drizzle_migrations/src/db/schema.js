import { pgTable, varchar, integer, text, date, boolean, serial } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const signin = pgTable("signin", {
	name: varchar({ length: 30 }),
	email: varchar({ length: 40 }),
	phone: integer(),
	pass: text(),
	role: varchar({ length: 30 }),
});

export const orders = pgTable("orders", {
	cateremail: varchar({ length: 50 }),
	customeremail: varchar({ length: 50 }),
	price: integer(),
	orderdate: date().default(sql`CURRENT_DATE`),
	catername: varchar({ length: 30 }),
});

export const cater = pgTable("cater", {
	name: varchar({ length: 30 }),
	location: varchar({ length: 50 }),
	about: text(),
	price: integer(),
	email: varchar({ length: 40 }),
	pass: text(),
	complete: boolean(),
});

export const ordertableTestuser = pgTable("ordertable_testuser", {
	id: serial().primaryKey().notNull(),
	catername: varchar({ length: 40 }),
	amount: integer(),
	orderDate: date("order_date").default(sql`CURRENT_DATE`),
});

export const catermenu = pgTable("catermenu", {
	catername: varchar({ length: 30 }),
	food: varchar({ length: 40 }),
	proteins: integer(),
	fat: integer(),
	calorie: integer(),
	price: integer(),
	time: varchar({ length: 30 }),
	email: varchar({ length: 50 }),
});
