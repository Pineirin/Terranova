import csv
import psycopg2
from psycopg2 import Error

def read_csv_and_insert_data(table_name):
    try:
        connection = psycopg2.connect(
            dbname="terranova",
            user="postgres",
            password="39790251",
            host="localhost"
        )

        cursor = connection.cursor()

        cursor.execute(f"TRUNCATE TABLE {table_name} RESTART IDENTITY CASCADE")

        with open(f'API/{table_name}.csv', 'r') as f:
            reader = csv.reader(f, delimiter=';')

            for row in reader:
                cursor.execute(
                    f"INSERT INTO {table_name} (name, keyword, description) VALUES (%s, %s, %s)",
                    row
                )

        connection.commit()

    except (Exception, Error) as error:
        connection.rollback()
        print("Error while connecting to PostgreSQL", error)

    finally:
        if connection:
            cursor.close()
            connection.close()

if __name__ == '__main__':
    table_name = "special_rules"
    read_csv_and_insert_data(table_name)