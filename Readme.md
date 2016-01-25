# SQL-Angular-Routing-Weekend Assignment

#Address and Order Viewer Application

##Instructions

You will be building out an address and order viewing application using the full stack and an SQL database. Both parts take advantage of one-to-many relationships in the data to be efficient.

You’ll need to use much of what you’ve learned to-date in order to complete it. Don’t worry, however. While this is a solo project, it is open. You can make use of your classmates and other resources however you’d like. You can use previous code or choose to build it all from scratch.

###Set-up the Database

Be sure to read the comments in this file!

1. Create a New Postgres Database in PgAdmin or Postico.
2. Take the included sql_data.sql SQL file and update it where it asks (your name, add 2 addresses for yourself, uncomment the orders insert lines).
3. Copy the SQL from this file and run it against this database in PgAdmin or Postico.
4. You will now have a good place to work from.

##Application Requirements
Build out 2 complete views using Angular Route Provider and partials. These views will be used to display information for the selected user of the system. Each will need to get data from the server based on user action.

###View 1: Address Display
1. Drop down/select list of all users
2. When one is selected, display all of their addresses
3. Format the addresses nicely like a real address with line breaks, spaces, etc.

###View 2: Order Lookup by Date
1. Drop down/select list of all users
2. Input fields for Start Date and End Date
3. When one is selected, display all of the orders for this user within the date range given in a table. Also blow out the data to display:
      - All orders fields
      - Include address street, city, state, and zip for that order
      - Include user’s name
4. Sum the total amount spent at the bottom for only the selected orders
5. Make sure the amount fields have a dollar sign and proper commas and formatting
6.

##Pro Mode

Integrate Sass into your project!


##SQL Examples

```sql
-- General Date Range selection
SELECT * FROM orders WHERE order_date > '2014-01-01' AND order_date < 'tomorrow';

-- Generic JOIN syntax. This will show the user’s names and their addresses
SELECT users.name, addresses.* FROM users JOIN addresses ON users.id = addresses.user_id;

 -- Get all the info in our entire database for a particular user’s orders
SELECT users.name, addresses.*, orders.*
FROM orders
JOIN addresses
	ON addresses.address_id = orders.ship_address_id
JOIN users
	ON users.id = <connected to which field?>
WHERE orders.user_id = 1;
```