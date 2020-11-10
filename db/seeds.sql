USE employee_db;

INSERT INTO department (name) VALUES ("Human Resources");
INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Technology");
INSERT INTO department (name) VALUES ("Corporate");

INSERT INTO role (title, salary, department_id) VALUES ("Analyst", 70, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Communications Associate", 50, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Social Media Manager", 50, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Director's Associate", 100, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Director", 100, 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Daivid", "Jeter", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Abbie", "Whitman", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Katy", "Piet", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Rach", "Suirm", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Lizzy", "Halp", 5);
