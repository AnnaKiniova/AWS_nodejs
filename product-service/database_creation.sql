create table products(
	id uuid primary key default uuid_generate_v4(),
	title text not null,
	description text,
	price integer
);

create table stock(
	product_id uuid,
	count integer,
	foreign key ("product_id") references "products" ("id")
);

insert into products (title, description, price) values
	('Mirra CB-290 1/4', 'Cello 1/4 Mirra', 100),
	('Cervini HV-150 1/2', 'Violin 1/2 with case', 50),
	('Yamaha P-45B', 'Piano digital', 300),
	('Soundking SKD230', 'Drums', 700),
	('Fender CD-60S Natural', 'Guitar acoustic', 300),
	('Cervini cello 1/2', 'Cello 1/2', 1250),
	('Casio CTK-3500', 'Piano digital', 650),
	('Yamaha new', 'Piano digital', 1100)
;

insert into stock (product_id, count) values
	('9ba3f8d7-a0aa-42b0-a48e-cec371a663d9', 4),
	('492c5244-9e79-40ab-8358-3e8e9bc0b66e', 2),
	('94a79867-7518-4070-8c01-e24465448867', 10),
	('2f637dec-72b0-450d-b153-6e6d4f51b49a', 1),
	('d9396836-fb89-4869-a5e5-ead185b3d873', 3),
	('39c990f7-e7b1-4b7e-8f0d-5defaa314a34', 1),
	('4d2a13ed-2013-4666-97a6-d898df8d8857', 5),
	('12fe5471-6f3f-41dc-9653-d1db3e256726', 3)
;

create extension if not exists "uuid-ossp";
