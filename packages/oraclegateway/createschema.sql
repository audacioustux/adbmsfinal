SET ECHO ON

ALTER SESSION SET CONTAINER=orclpdb1;
DROP USER scott CASCADE;
CREATE USER scott IDENTIFIED BY tiger;
GRANT CONNECT, RESOURCE TO scott;
ALTER USER scott QUOTA UNLIMITED ON USERS;

DROP TABLE scott.bananas;
CREATE TABLE scott.bananas (shipment VARCHAR2(4000) CHECK (shipment IS JSON));

INSERT INTO scott.bananas VALUES ('{ "farmer": "Gita", "ripeness": "All Green", "kilograms": 100 }');
INSERT INTO scott.bananas VALUES ('{ "farmer": "Ravi", "ripeness": "Full Yellow", "kilograms": 90 }');
INSERT INTO scott.bananas VALUES ('{ "farmer": "Mindy", "ripeness": "More Yellow than Green", "kilograms": 92 }');

COMMIT;

EXIT
