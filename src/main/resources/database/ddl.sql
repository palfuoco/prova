--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: recensione; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recensione (
    id integer NOT NULL,
    voto numeric(1,0) NOT NULL,
    commento character varying(800) NOT NULL,
    data_pubblicazione date NOT NULL,
    email_utente character varying(200) NOT NULL,
    id_ricetta integer NOT NULL
);


ALTER TABLE public.recensione OWNER TO postgres;

--
-- Name: recensione_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recensione_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recensione_id_seq OWNER TO postgres;

--
-- Name: recensione_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recensione_id_seq OWNED BY public.recensione.id;


--
-- Name: regione; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.regione (
    nome character varying(100) NOT NULL,
    latitudine real NOT NULL,
    longitudine real NOT NULL
);


ALTER TABLE public.regione OWNER TO postgres;

--
-- Name: ricetta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ricetta (
    id integer NOT NULL,
    nome character varying(200) NOT NULL,
    descrizione text,
    ingredienti character varying(400) NOT NULL,
    tempo_preparazione smallint NOT NULL,
    regione character varying(200) NOT NULL,
    difficolta character varying(100) NOT NULL,
    tipo character varying(200) NOT NULL,
    descrizione_preparazione text,
    img character varying(100) NOT NULL,
    dose_iniziale integer
);


ALTER TABLE public.ricetta OWNER TO postgres;

--
-- Name: ricetta_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ricetta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ricetta_id_seq OWNER TO postgres;

--
-- Name: ricetta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ricetta_id_seq OWNED BY public.ricetta.id;


--
-- Name: utente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utente (
    email character varying(200) NOT NULL,
    nickname character varying(200) NOT NULL,
    password character varying(200) NOT NULL,
    regione_di_residenza character varying(100) NOT NULL
);


ALTER TABLE public.utente OWNER TO postgres;

--
-- Name: recensione id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recensione ALTER COLUMN id SET DEFAULT nextval('public.recensione_id_seq'::regclass);


--
-- Name: ricetta id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ricetta ALTER COLUMN id SET DEFAULT nextval('public.ricetta_id_seq'::regclass);


--
-- Name: recensione recensione_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT recensione_pkey PRIMARY KEY (id);


--
-- Name: regione regioni_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.regione
    ADD CONSTRAINT regioni_pkey PRIMARY KEY (nome);


--
-- Name: ricetta ricetta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ricetta
    ADD CONSTRAINT ricetta_pkey PRIMARY KEY (id);


--
-- Name: utente utente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utente
    ADD CONSTRAINT utente_pkey PRIMARY KEY (email);


--
-- Name: recensione recensione_email_utente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT recensione_email_utente_fkey FOREIGN KEY (email_utente) REFERENCES public.utente(email);


--
-- Name: recensione recensione_id_ricetta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recensione
    ADD CONSTRAINT recensione_id_ricetta_fkey FOREIGN KEY (id_ricetta) REFERENCES public.ricetta(id);


--
-- PostgreSQL database dump complete
--

