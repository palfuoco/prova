CREATE SEQUENCE IF NOT EXISTS recensione_id_seq START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS ricetta_id_seq START 1 INCREMENT 1;
CREATE SEQUENCE IF NOT EXISTS tradizione_culinaria_id_seq START 1 INCREMENT 1;

CREATE TABLE IF NOT EXISTS tradizione_culinaria (
                                                    id INTEGER PRIMARY KEY DEFAULT nextval('tradizione_culinaria_id_seq'),
    titolo VARCHAR(255) NOT NULL,
    testo TEXT,
    regione VARCHAR(100),
    likes INTEGER DEFAULT 0,
    url_ricetta_dettaglio VARCHAR(500),
    img VARCHAR(255)
    );

CREATE TABLE IF NOT EXISTS utente (
                                      email VARCHAR(200) PRIMARY KEY,
    nickname VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    regione_di_residenza VARCHAR(100) NOT NULL
    );

CREATE TABLE IF NOT EXISTS regione (
                                       nome VARCHAR(100) PRIMARY KEY,
    latitudine REAL NOT NULL,
    longitudine REAL NOT NULL
    );

CREATE TABLE IF NOT EXISTS ricetta (
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

CREATE TABLE IF NOT EXISTS recensione (
                                          id INTEGER PRIMARY KEY DEFAULT nextval('recensione_id_seq'),
    voto NUMERIC(1,0) NOT NULL,
    commento VARCHAR(800) NOT NULL,
    data_pubblicazione DATE NOT NULL,
    email_utente VARCHAR(200) NOT NULL,
    id_ricetta INTEGER NOT NULL
    );

CREATE TABLE IF NOT EXISTS preferiti(
                                        email_utente varchar(100) not null references utente(email),
    id_ricetta int not null references ricetta(id),
    primary key (email_utente,id_ricetta)
    );
