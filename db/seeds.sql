INSERT INTO
    neonatal_departments (name)
VALUES  ("Neonatal ICU"),
        ("Intermediate Care Nursery"),
        ("Newborn Well Baby"),
        ("Management");

INSERT INTO
    roles (title, hourly, department_id)
VALUES  ("Clinical Nurse II", 90, 1), 
        ("Clinical Nurse III", 100, 1), 
        ("Clinical Nurse IV", 115, 1), 
        ("Clinical Nurse I - New Grad", 80, 1),
        ("Clinical Nurse II", 90, 2), 
        ("Clinical Nurse III", 100, 2), 
        ("Clinical Nurse IV", 115, 2), 
        ("Clinical Nurse I - New Grad", 80, 2),
        ("Clinical Nurse II", 90, 3), 
        ("Clinical Nurse III", 100, 3), 
        ("Clinical Nurse IV", 115, 3), 
        ("Clinical Nurse I - New Grad", 80, 3),
        ("Clinical Nurse II", 90, 4), 
        ("Clinical Nurse III", 100, 4), 
        ("Clinical Nurse IV", 115, 4), 
        ("Clinical Nurse I - New Grad", 80, 4);

INSERT INTO employees (firstName, lastName, role_id, manager_id)
VALUES ("Florence", "Nightingale", 4, NULL),
       ("Grace", "Nelson", 4, NULL),
       ("Sergio", "Vidales-Perez", 4, NULL),
       ("Susan", "Wheeler", 4, NULL),
       ("Bitsy", "Behrendt", 3, 1),
       ("Denise", "Woodworth", 7, 2),
       ("Kim", "Nguyen", 1, 2),
       ("Thione", "Tran", 9, 1),
       ("Raquel", "Romero", 2, 3),
       ("Clarice","Kwong", 12, 3),
       ("Kelli","Lozada", 3, 4),
       ("Ashley", "Gremillion", 14, 2),
       ("Jessica", "Kim", 15, 4),
       ("Ysabel", "Anton", 16, 2);