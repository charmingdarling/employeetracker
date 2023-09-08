INSERT INTO
    neonatal_departments (name)
VALUES  ("Neonatal ICU"),
        ("Intermediate Care Nursery"),
        ("Newborn Well Baby"),
        ("Management");

INSERT INTO
    roles (title, hourly, department_id)
VALUES  ("Clinical Nurse II", 85, 3), 
        ("Clinical Nurse III", 100, 1), 
        ("Clinical Nurse IV", 115, 1), 
        ("Clinical Nurse I - New Grad", 4, 85);

INSERT INTO employees (firstName, lastName, role_id, manager_id)
VALUES ("Florence", "Nightingale", 4, NULL),
       ("Grace", "Nelson", 4, NULL),
       ("Sergio", "Vidales-Perez", 4, NULL),
       ("Susan", "Wheeler", 4, NULL),
       ("Bitsy", "Behrendt", 1, 1),
       ("Denise", "Woodworth", 1, 2),
       ("Kim", "Nguyen", 1, 2),
       ("Thione", "Tran", 1, 1),
       ("Raquel", "Romero", 2, 3),
       ("Clarice","Kwong", 3, 3),
       ("Kelli","Lozada", 3, 4),
       ("Ashley", "Gremillion", 4, 2),
       ("Jessica", "Kim", 4, 4),
       ("Ysabel", "Anton", 4, 2);