
CREATE SEQUENCE recensione_id_seq START 1 INCREMENT 1;
CREATE SEQUENCE ricetta_id_seq START 1 INCREMENT 1;


CREATE TABLE utente (
                        email VARCHAR(200) PRIMARY KEY,
                        nickname VARCHAR(200) NOT NULL,
                        password VARCHAR(200) NOT NULL,
                        regione_di_residenza VARCHAR(100) NOT NULL
);


CREATE TABLE regione (
                         nome VARCHAR(100) PRIMARY KEY,
                         latitudine REAL NOT NULL,
                         longitudine REAL NOT NULL
);


CREATE TABLE ricetta (
                         id INTEGER PRIMARY KEY DEFAULT nextval('ricetta_id_seq'),
                         nome VARCHAR(200) NOT NULL,
                         descrizione TEXT,
                         ingredienti VARCHAR(400) NOT NULL,
                         tempo_preparazione SMALLINT NOT NULL,
                         regione VARCHAR(200) NOT NULL,
                         difficolta VARCHAR(100) NOT NULL,
                         tipo VARCHAR(200) NOT NULL,
                         descrizione_preparazione TEXT,
                         img VARCHAR(100) NOT NULL,
                         dose_iniziale INTEGER
);


CREATE TABLE recensione (
                            id INTEGER PRIMARY KEY DEFAULT nextval('recensione_id_seq'),
                            voto NUMERIC(1,0) NOT NULL,
                            commento VARCHAR(800) NOT NULL,
                            data_pubblicazione DATE NOT NULL,
                            email_utente VARCHAR(200) NOT NULL,
                            id_ricetta INTEGER NOT NULL,
                            FOREIGN KEY (email_utente) REFERENCES utente(email),
                            FOREIGN KEY (id_ricetta) REFERENCES ricetta(id)
);
