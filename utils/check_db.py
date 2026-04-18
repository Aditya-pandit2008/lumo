import sqlite3

# Connect to the database
conn = sqlite3.connect('instance/lumo.db')
cursor = conn.cursor()

# Get all tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cursor.fetchall()

print("Database Tables:")
for table in tables:
    print(f"- {table[0]}")

    # Get table structure
    cursor.execute(f"PRAGMA table_info({table[0]})")
    columns = cursor.fetchall()
    if columns:
        print("  Columns:")
        for col in columns:
            print(f"    {col[1]} ({col[2]}) {'PRIMARY KEY' if col[5] else ''}")

    # Get row count
    cursor.execute(f"SELECT COUNT(*) FROM {table[0]}")
    count = cursor.fetchone()[0]
    print(f"  Rows: {count}")
    print()

# Check for users
cursor.execute("SELECT COUNT(*) FROM user")
user_count = cursor.fetchone()[0]
print(f"Total users registered: {user_count}")

if user_count > 0:
    cursor.execute("SELECT id, email, name, created_at FROM user LIMIT 5")
    users = cursor.fetchall()
    print("\nRecent users:")
    for user in users:
        print(f"- ID: {user[0]}, Email: {user[1]}, Name: {user[2]}, Created: {user[3]}")

conn.close()