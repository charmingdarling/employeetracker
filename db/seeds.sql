INSERT INTO
    neonatal_departments (name)
VALUES ("Neonatal ICU"), ("Intermediate Care Nursery"), ("Newborn Well Baby"), ("Management");

INSERT INTO
    role (title, hourly, department_id)
VALUES ("Clinical Nurse II", 85, 3), ("Clinical Nurse III", 100, 1), ("Clinical Nurse IV", 115, 1), (
        "Clinical Nurse I, New Grad",
        4,
        85
    )

INSERT INTO
    employees (
        firstName,
        lastName,
        role_id,
        manager_id
    )
VALUES ("Clarice", "Kwong", 3), ("Kim", "Nguyen", 1,), ("Ashley", "Gremillion", 4), ("Ysabel", "Anton", 4), ("Bitsy", "Behrendt", 1,), ("Denise", "Woodworth", 1), ("Raquel", "Romero",), ("Kelli", "Lozada",), ("Thione", "Tran",), ("Jessica", "Kim",), (
        "Sergio",
        "Vidales-Perez",
        4,
        NULL
    ), ("Grace", "Nelson", 4, NULL), ("Susan", "Wheeler", 4, NULL), (
        "Florence",
        "Nightingale",
        4,
        NULL
    );