DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(100) NOT NULL,
  department VARCHAR(50) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity DECIMAL(10,2) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("Tide", "Home_Goods", 8.50, 22);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("Colgate", "Personal_Goods", 1.50, 100);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("Shampoo", "Personal_Goods", 4.00, 88);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("Planter", "Outdoor_Goods", 24.50, 16);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("Watch", "Accessories", 100.50, 10);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("Rings", "Accessories", 400.00, 8);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("iPhone", "Electronics", 800.00, 6);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("Samsung_8S", "Electronics", 750.00, 8);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("Roku", "Electronics", 39.95, 34);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("Snickers", "Foods", .95, 50);

INSERT INTO products (product, department, price, stock_quantity)
VALUES ("Lindt Truffles", "Foods", 9.95, 34);
