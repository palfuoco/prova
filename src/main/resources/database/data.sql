INSERT INTO ricetta (id, nome, descrizione, ingredienti, tempo_preparazione, regione, difficolta, tipo, descrizione_preparazione, img, dose_iniziale) VALUES
                                                                                                                                                          (1, 'Pasta erbette e acciughe', 'Un primo piatto semplice e saporito: pasta con erbette fresche e acciughe, per un gusto autentico e mediterraneo.',
                                                                                                                                                           '500g erbette di campo,q.b. sale grosso,320g mezze maniche,9 acciughe sott''olio,1/2-spicchio aglio,q.b. olio extravergine di oliva,q.b. peperoncino',
                                                                                                                                                           15, 'Liguria', 'Facile', 'Primo',
                                                                                                                                                           '1.Prepariamo le nostre erbette, già bollite e strizzate.2.Facciamo bollire l’acqua, saliamo e buttiamo la pasta.3.Nel frattempo portiamo sul fuoco una padella con olio extravergine d’oliva. Aggiungiamo e facciamo soffriggere l’aglio tritato, il peperoncino e i filetti d’acciuga.4.Mescoliamo e facciamo “sciogliere” le acciughe.5.Sminuzziamo le erbette e poi aggiungiamole in padella.6.Scoliamo la pasta al dente direttamente in padella.7.Aggiungiamo un po’ di acqua di cottura e mescoliamo bene per insaporire e amalgamare il condimento con le mezze maniche.8.Ecco pronta la nostra pasta erbette e acciughe! Se vogliamo possiamo guarnire i piatti con un filo d’olio e un’acciuga intera.',
                                                                                                                                                           'pasta_erbette_acciughe', 4),

                                                                                                                                                          (2, 'Pasta cu a muddica', 'La pasta cu a muddica è un piatto calabrese povero ma ricco di sapore, preparato con pangrattato tostato (la muddica), aglio, olio e acciughe. Croccante e saporita',
                                                                                                                                                           '280g spaghetti,4 filetti acciughe sott''olio,30g mollica di pane,q.b. aglio,40g olio extravergine di oliva,q.b. peperoncino,q.b. sale',
                                                                                                                                                           10, 'Calabria', 'Facile', 'Primo',
                                                                                                                                                           '1.In una padella tostare il pane.2.In una padella a parte versare l’olio, mettere l’aglio macinato, unire le acciughe, farle sciogliere e aromatizzare con il peperoncino. Conservare a parte.3.Porre sul fuoco una pentola con acqua salata, portare a bollore e buttare la pasta.4.Scolare la pasta e ripassarla in padella eventualmente aggiungendo un filo di acqua di cottura della pasta.5.Porre la pasta nei piatti, aggiungere il pane, spolverizzare con peperoncino e servire.',
                                                                                                                                                           'pasta_cu_a_muddica', 4),

                                                                                                                                                          (3, 'Cotoletta alla Milanese', 'Un secondo piatto tipico della cucina lombarda, sfizioso e irresistibile, che possiamo preparare in poco tempo.',
                                                                                                                                                           '2 lombata di vitello,2 uova,q.b. farina,q.b. pangrattato,200g burro,q.b. fiocchi di sale',
                                                                                                                                                           27, 'Lombardia', 'Facile', 'Secondo',
                                                                                                                                                           '1.Puliamo le fette di carne rimuovendo il grasso in eccesso e liberando in parte l’osso con un coltello.2.Battiamo la carne con l’apposito accessorio per qualche attimo, oppure usiamo il fondo di un bicchiere resistente.3.Infariniamo le fette di vitello su entrambi i lati facendo aderire bene la farina.4.Ora procediamo con la panatura. Teniamo a portata di mano un piatto fondo con le uova sbattute e un piatto piano con il pangrattato. Immergiamo la carne infarinata nelle uova, poi passiamola nel pane in modo da panarla completamente.5.In una padella sciogliamo il burro, scaldiamolo e poi friggiamo a fuoco medio-alto le cotolette una alla volta, girandole a metà cottura. A seconda delle dimensioni, 2-3 minuti per lato dovrebbero bastare.6.Preleviamo ciascuna cotoletta alla milanese dalla padella con delle pinze, poggiamole un momento sulla carta assorbente, completiamo con i fiocchi di sale e gustiamole!',
                                                                                                                                                           'cotoletta_milanese', 2),

                                                                                                                                                          (4, 'Carbonara', 'Uno dei primi piatti più amati della tradizione culinaria romana, che possiamo portare in tavola con una ricetta facile e veloce.',
                                                                                                                                                           '400g spaghetti,100g guanciale,2 tuorli,2 uova intere,25g grana grattugiato,25g pecorino,q.b. olio d''oliva,q.b. sale fino,q.b. pepe',
                                                                                                                                                           15, 'Lazio', 'Facile', 'Primo',
                                                                                                                                                           '1.Mettiamo l’acqua per la pasta sul fuoco e nel frattempo preparate il condimento. Saltiamo in padella il guanciale insieme a un filo d’olio per un paio di minuti, quindi spegniamo il fuoco e mettiamo da parte.2.In una terrina capiente sgusciamo l’uovo intero e aggiungiamo anche il tuorlo, i formaggi grattugiati e abbondante pepe. Lavoriamo tutti gli ingredienti con una frusta fino a ottenere un composto cremoso e ben amalgamato.3.Cuociamo gli spaghetti in acqua salata e scoiamoli al dente direttamente nella ciotola delle uova. Aggiungiamo i cubetti di guanciale e mantechiamo velocemente la pasta.4.Ecco la nostra carbonara servita in tavola! Vi consiglio di mangiarla ben calda.',
                                                                                                                                                           'carbonara', 4);


INSERT INTO regione (nome, latitudine, longitudine) VALUES
                                                        ('Calabria', 39.30877, 16.346378),
                                                        ('Basilicata', 40.643078, 15.969988),
                                                        ('Campania', 40.851776, 14.268124),
                                                        ('Puglia', 40.79284, 17.101192),
                                                        ('Lazio', 41.655243, 12.989615),
                                                        ('Marche', 43.462734, 13.358729),
                                                        ('Molise', 41.673885, 14.752094),
                                                        ('Umbria', 42.938004, 12.621621),
                                                        ('Abruzzo', 42.192013, 13.728917),
                                                        ('Toscana', 43.76956, 11.255814),
                                                        ('Emilia-Romagna', 44.59676, 11.21864),
                                                        ('Piemonte', 45.05224, 7.515388),
                                                        ('Valle d''Aosta', 45.738888, 7.426187),
                                                        ('Lombardia', 45.47907, 9.845243),
                                                        ('Veneto', 45.441467, 12.31526),
                                                        ('Trentino Alto-Adige', 46.07478, 11.121749),
                                                        ('Friuli Venezia Giulia', 46.225918, 13.103365),
                                                        ('Sicilia', 37.599995, 14.015356),
                                                        ('Sardegna', 40.120876, 9.012893),
                                                        ('Liguria', 44.31679, 8.396494);
