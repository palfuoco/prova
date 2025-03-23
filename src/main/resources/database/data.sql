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

--
-- Data for Name: ricetta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ricetta (id, nome, descrizione, ingredienti, tempo_preparazione, regione, difficolta, tipo, descrizione_preparazione, img) FROM stdin;
1	Pasta erbette e acciughe	Un primo piatto semplice e saporito: pasta con erbette fresche e acciughe, per un gusto autentico e mediterraneo.	500g erbette di campo,q.b. sale grosso,320g mezze maniche,9 acciughe sott'olio,1/2-spicchio aglio,q.b. olio extravergine di oliva,q.b. peperoncino	15	Liguria	Facile	Primo	1.Prepariamo le nostre erbette, già bollite e strizzate.2.Facciamo bollire l’acqua, saliamo e buttiamo la pasta.3.Nel frattempo portiamo sul fuoco una padella con olio extravergine d’oliva. Aggiungiamo e facciamo soffriggere l’aglio tritato, il peperoncino e i filetti d’acciuga.4.Mescoliamo e facciamo “sciogliere” le acciughe.5.Sminuzziamo le erbette e poi aggiungiamole in padella.6.Scoliamo la pasta al dente direttamente in padella.7.Aggiungiamo un po’ di acqua di cottura e mescoliamo bene per insaporire e amalgamare il condimento con le mezze maniche.8.Ecco pronta la nostra pasta erbette e acciughe! Se vogliamo possiamo guarnire i piatti con un filo d’olio e un’acciuga intera.	pasta_erbette_acciughe
2	Pasta cu a muddica	La pasta cu a muddica è un piatto calabrese povero ma ricco di sapore, preparato con pangrattato tostato (la muddica), aglio, olio e acciughe. Croccante e saporita	280g spaghetti,4 filetti acciughe sott'olio,30g mollica di pane,q.b. aglio,40g olio extravergine di oliva,q.b. peperoncino,q.b. sale	10	Calabria	Facile	Primo	1.In una padella tostare il pane.2.In una padella a parte versare l’olio, mettere l’aglio macinato, unire le acciughe, farle sciogliere e aromatizzare con il peperoncino. Conservare a parte.3.Porre sul fuoco una pentola con acqua salata, portare a bollore e buttare la pasta.4.Scolare la pasta e ripassarla in padella eventualmente aggiungendo un filo di acqua di cottura della pasta.5.Porre la pasta nei piatti, aggiungere il pane, spolverizzare con peperoncino e servire.	pasta_cu_a_muddica
\.


--
-- Data for Name: utente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utente (email, nickname, password, regione_di_residenza) FROM stdin;
\.


--
-- Data for Name: recensione; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recensione (id, voto, commento, data_pubblicazione, email_utente, id_ricetta) FROM stdin;
\.


--
-- Data for Name: regione; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.regione (nome, latitudine, longitudine) FROM stdin;
Calabria	39.30877	16.346378
Basilicata	40.643078	15.969988
Campania	40.851776	14.268124
Puglia	40.79284	17.101192
Lazio	41.655243	12.989615
Marche	43.462734	13.358729
Molise	41.673885	14.752094
Umbria	42.938004	12.621621
Abruzzo	42.192013	13.728917
Toscana	43.76956	11.255814
Emilia-Romagna	44.59676	11.21864
Piemonte	45.05224	7.515388
Valle d'Aosta	45.738888	7.426187
Lombardia	45.47907	9.845243
Veneto	45.441467	12.31526
Trentino Alto-Adige	46.07478	11.121749
Friuli Venezia Giulia	46.225918	13.103365
Sicilia	37.599995	14.015356
Sardegna	40.120876	9.012893
Liguria	44.31679	8.396494
\.


--
-- Name: recensione_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recensione_id_seq', 1, false);


--
-- Name: ricetta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ricetta_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

