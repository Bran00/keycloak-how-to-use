# Keycloak + MySQL with Docker Compose

This project sets up an authentication environment using **Keycloak** and **MySQL** with Docker Compose.

---

## Requirements

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/) installed

---

## Configuration

The `docker-compose.yml` file defines two services:

- **Keycloak**
  - Port: `8080`
  - Admin user: `admin`
  - Admin password: `admin`
  - Database: MySQL

- **MySQL**
  - Internal port: `3306`
  - Root user: `root`
  - Root password: `root`
  - Database: `keycloak`
  - Persistent volume: `./.docker/dbdata:/var/lib/mysql`

---

## How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/Bran00/keycloak-how-to-use
   cd keycloak-how-to-use
   ```

2. Start the containers:
   ```bash
   docker compose up -d
   ```

3. Check running services:
   ```bash
   docker compose ps
   ```

4. Access Keycloak in your browser:  
   `http://localhost:8080`

   Login credentials:
   - Username: `admin`
   - Password: `admin`

---

## Observations

This application was built for educational purposes.  
Do not use this version in **production**.

---

## How to Use

- **Users and Passwords**  
  To add users and set passwords:  
  1. Log in to the Keycloak Admin Console.  
  2. Go to **Manage → Users**.  
  3. Click **Add User** and fill in the required fields.  
  4. After creating the user, go to the **Credentials** tab to set a password.  

- **Check Email and Temporary Password**  
  1. When creating a user, you can enable the option to send a temporary password by email.  
  2. The user will receive an email with instructions to log in and change the password.  

- **Assign Admin Role to Users**  
  1. In the Admin Console, go to **Manage → Users**.  
  2. Select the user you want to promote.  
  3. Go to the **Role Mappings** tab.  
  4. Assign the role `admin` (or another appropriate realm role) to grant administrative privileges.  

- Manage Realm
  1. Log in to the **Keycloak Admin Console**.
  2. Click the realm dropdown in the top-left corner.
  3. Select **Create Realm**.
  4. Enter the realm name.
  5. Click **Create**.
  6. Open the newly created realm to manage its users, roles, groups, clients, and settings.

- Roles and Groups
  1. In the **Keycloak Admin Console**, select your realm.
  2. To create a role, go to **Manage → Roles**.
  3. Click **Create Role**, enter the role name, and save.
  4. To create a group, go to **Manage → Groups**.
  5. Click **Create Group**, enter the group name, and save.
  6. To assign a user to a group, go to **Manage → Users**, select the user, and join the desired group.
  7. To assign roles, open the user or group and use the **Role Mappings** tab.

---

## Useful Commands

- Stop services:
  ```bash
  docker compose down
  ```

- View logs:
  ```bash
  docker compose logs -f keycloak
  ```

- Reset database (this will delete all data):
  ```bash
  rm -rf ./.docker/dbdata
  ```
```

