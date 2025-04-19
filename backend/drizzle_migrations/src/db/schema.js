import { pgTable, serial, varchar, integer, date, text, unique, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const ordertableTestuser = pgTable("ordertable_testuser", {
	id: serial().primaryKey().notNull(),
	catername: varchar({ length: 40 }),
	amount: integer(),
	orderDate: date("order_date").default(sql`CURRENT_DATE`),
});

export const signin = pgTable("signin", {
	name: varchar({ length: 30 }),
	email: varchar({ length: 40 }),
	phone: integer(),
	pass: text(),
	role: varchar({ length: 30 }),
});

export const cater = pgTable("cater", {
	name: varchar({ length: 30 }),
	location: varchar({ length: 50 }),
	about: text(),
	price: integer(),
	email: varchar({ length: 40 }),
	pass: text(),
	complete: boolean(),
	uuid: text().notNull(),
}, (table) => [
	unique("cater_uuid_key").on(table.uuid),
]);

export const orders = pgTable("orders", {
	cateremail: varchar({ length: 50 }),
	customeremail: varchar({ length: 50 }),
	price: integer(),
	orderdate: date().default(sql`CURRENT_DATE`),
	catername: varchar({ length: 30 }),
	uuid: text().notNull(),
});

export const catermenu = pgTable("catermenu", {
	food: varchar({ length: 40 }),
	proteins: integer(),
	fat: integer(),
	calorie: integer(),
	price: integer(),
	time: varchar({ length: 30 }),
	email: varchar({ length: 50 }),
	uuid: text().notNull(),
});
