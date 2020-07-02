--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-07-02 23:18:11 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3252 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 34429)
-- Name: artists; Type: TABLE; Schema: public; Owner: forest
--

CREATE TABLE public.artists (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.artists OWNER TO forest;

--
-- TOC entry 204 (class 1259 OID 34437)
-- Name: genres; Type: TABLE; Schema: public; Owner: forest
--

CREATE TABLE public.genres (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.genres OWNER TO forest;

--
-- TOC entry 205 (class 1259 OID 34445)
-- Name: languages; Type: TABLE; Schema: public; Owner: forest
--

CREATE TABLE public.languages (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255),
    two_letters_code character varying(255),
    three_letters_code character varying(255),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.languages OWNER TO forest;

--
-- TOC entry 207 (class 1259 OID 34458)
-- Name: migrations; Type: TABLE; Schema: public; Owner: forest
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint,
    name character varying(255)
);


ALTER TABLE public.migrations OWNER TO forest;

--
-- TOC entry 206 (class 1259 OID 34456)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: forest
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO forest;

--
-- TOC entry 3253 (class 0 OID 0)
-- Dependencies: 206
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: forest
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 208 (class 1259 OID 34464)
-- Name: playlists; Type: TABLE; Schema: public; Owner: forest
--

CREATE TABLE public.playlists (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.playlists OWNER TO forest;

--
-- TOC entry 210 (class 1259 OID 34490)
-- Name: playlists_songs_songs; Type: TABLE; Schema: public; Owner: forest
--

CREATE TABLE public.playlists_songs_songs (
    playlist_id uuid,
    song_id uuid
);


ALTER TABLE public.playlists_songs_songs OWNER TO forest;

--
-- TOC entry 211 (class 1259 OID 34505)
-- Name: publishers; Type: TABLE; Schema: public; Owner: forest
--

CREATE TABLE public.publishers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.publishers OWNER TO forest;

--
-- TOC entry 209 (class 1259 OID 34472)
-- Name: songs; Type: TABLE; Schema: public; Owner: forest
--

CREATE TABLE public.songs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(255),
    length integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    artist_id uuid,
    language_id uuid
);


ALTER TABLE public.songs OWNER TO forest;

--
-- TOC entry 212 (class 1259 OID 34513)
-- Name: songs_genres_genres; Type: TABLE; Schema: public; Owner: forest
--

CREATE TABLE public.songs_genres_genres (
    song_id uuid,
    genre_id uuid
);


ALTER TABLE public.songs_genres_genres OWNER TO forest;

--
-- TOC entry 213 (class 1259 OID 34528)
-- Name: songs_publishers_publishers; Type: TABLE; Schema: public; Owner: forest
--

CREATE TABLE public.songs_publishers_publishers (
    song_id uuid,
    publisher_id uuid
);


ALTER TABLE public.songs_publishers_publishers OWNER TO forest;

--
-- TOC entry 214 (class 1259 OID 34543)
-- Name: songs_writers_artists; Type: TABLE; Schema: public; Owner: forest
--

CREATE TABLE public.songs_writers_artists (
    song_id uuid,
    artist_id uuid
);


ALTER TABLE public.songs_writers_artists OWNER TO forest;

--
-- TOC entry 3067 (class 2604 OID 34461)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3235 (class 0 OID 34429)
-- Dependencies: 203
-- Data for Name: artists; Type: TABLE DATA; Schema: public; Owner: forest
--

COPY public.artists (id, name, created_at, updated_at) FROM stdin;
79e360b8-30e2-49e4-a840-33444a81b51b	my artist 1	2020-06-30 17:53:53.259751+02	2020-06-30 17:53:53.259751+02
\.


--
-- TOC entry 3236 (class 0 OID 34437)
-- Dependencies: 204
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: forest
--

COPY public.genres (id, name, created_at, updated_at) FROM stdin;
3bd5f3c7-03c8-4ba7-a9ce-bcf94a84ff47	FOLK	2020-06-30 16:37:23.397149+02	2020-06-30 16:37:23.397149+02
0d1946ef-32a5-43a4-8583-7b1b911f92bb	HIP HOP	2020-06-30 16:37:32.455228+02	2020-06-30 16:37:32.455228+02
a873e029-9433-4920-91c5-315cb70cb09b	POP MUSIC	2020-07-01 10:43:51.640605+02	2020-07-01 10:43:51.640605+02
fe1aee2d-2eb7-43ed-b37b-15108383817d	COUNTRY	2020-07-01 10:44:02.862994+02	2020-07-01 10:44:02.862994+02
\.


--
-- TOC entry 3237 (class 0 OID 34445)
-- Dependencies: 205
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: forest
--

COPY public.languages (id, name, two_letters_code, three_letters_code, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3239 (class 0 OID 34458)
-- Dependencies: 207
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: forest
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\.


--
-- TOC entry 3240 (class 0 OID 34464)
-- Dependencies: 208
-- Data for Name: playlists; Type: TABLE DATA; Schema: public; Owner: forest
--

COPY public.playlists (id, name, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3242 (class 0 OID 34490)
-- Dependencies: 210
-- Data for Name: playlists_songs_songs; Type: TABLE DATA; Schema: public; Owner: forest
--

COPY public.playlists_songs_songs (playlist_id, song_id) FROM stdin;
\.


--
-- TOC entry 3243 (class 0 OID 34505)
-- Dependencies: 211
-- Data for Name: publishers; Type: TABLE DATA; Schema: public; Owner: forest
--

COPY public.publishers (id, name, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3241 (class 0 OID 34472)
-- Dependencies: 209
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: forest
--

COPY public.songs (id, title, length, created_at, updated_at, artist_id, language_id) FROM stdin;
c76bc7c0-3862-485d-bb41-93d3f4fbfc73	my song #02	\N	2020-07-01 10:42:52.625969+02	2020-07-01 10:42:52.625969+02	\N	\N
a5348057-c549-4765-a8e4-72a95bc4598d	my song #03	\N	2020-07-01 10:45:22.800416+02	2020-07-01 10:45:22.800416+02	\N	\N
194e58a6-eab9-412c-a269-ff7e16d4f459	my song #04	\N	2020-07-01 10:45:48.18149+02	2020-07-01 10:45:48.18149+02	\N	\N
b0f156ff-b7fb-44fa-9fc1-c7a518c8679c	my song #05	\N	2020-07-01 10:45:55.065538+02	2020-07-01 10:45:55.065538+02	\N	\N
52884f95-57e5-45d2-a7f1-71cc33e976fd	my song #06	\N	2020-07-01 10:46:01.778192+02	2020-07-01 10:46:01.778192+02	\N	\N
17face00-9226-4ef5-922c-6ba8f04e807f	my song #07	\N	2020-07-01 10:46:07.889569+02	2020-07-01 10:46:07.889569+02	\N	\N
82ee2772-3456-408a-a71e-eadd7a5912e8	my song #08	\N	2020-07-01 10:46:15.379151+02	2020-07-01 10:46:15.379151+02	\N	\N
379a98b0-55ee-4a42-9295-e3c1e43ec1e9	my song #09	\N	2020-07-01 10:46:21.268419+02	2020-07-01 10:46:21.268419+02	\N	\N
e8962294-0022-40b1-9f67-fcc7947d749f	my song #10	\N	2020-07-01 10:46:27.097327+02	2020-07-01 10:46:27.097327+02	\N	\N
135ae19e-0f0a-48a3-a13b-049f1ccb5cc8	my song #11	\N	2020-07-01 10:46:33.593871+02	2020-07-01 10:46:33.593871+02	\N	\N
79cae125-6527-4792-8f50-34b140548f95	my song #01	200	2020-06-30 16:37:14.191039+02	2020-07-01 10:45:10.266241+02	79e360b8-30e2-49e4-a840-33444a81b51b	\N
\.


--
-- TOC entry 3244 (class 0 OID 34513)
-- Dependencies: 212
-- Data for Name: songs_genres_genres; Type: TABLE DATA; Schema: public; Owner: forest
--

COPY public.songs_genres_genres (song_id, genre_id) FROM stdin;
79cae125-6527-4792-8f50-34b140548f95	3bd5f3c7-03c8-4ba7-a9ce-bcf94a84ff47
79cae125-6527-4792-8f50-34b140548f95	0d1946ef-32a5-43a4-8583-7b1b911f92bb
c76bc7c0-3862-485d-bb41-93d3f4fbfc73	3bd5f3c7-03c8-4ba7-a9ce-bcf94a84ff47
c76bc7c0-3862-485d-bb41-93d3f4fbfc73	a873e029-9433-4920-91c5-315cb70cb09b
c76bc7c0-3862-485d-bb41-93d3f4fbfc73	fe1aee2d-2eb7-43ed-b37b-15108383817d
a5348057-c549-4765-a8e4-72a95bc4598d	3bd5f3c7-03c8-4ba7-a9ce-bcf94a84ff47
135ae19e-0f0a-48a3-a13b-049f1ccb5cc8	3bd5f3c7-03c8-4ba7-a9ce-bcf94a84ff47
e8962294-0022-40b1-9f67-fcc7947d749f	3bd5f3c7-03c8-4ba7-a9ce-bcf94a84ff47
379a98b0-55ee-4a42-9295-e3c1e43ec1e9	3bd5f3c7-03c8-4ba7-a9ce-bcf94a84ff47
379a98b0-55ee-4a42-9295-e3c1e43ec1e9	a873e029-9433-4920-91c5-315cb70cb09b
82ee2772-3456-408a-a71e-eadd7a5912e8	3bd5f3c7-03c8-4ba7-a9ce-bcf94a84ff47
82ee2772-3456-408a-a71e-eadd7a5912e8	0d1946ef-32a5-43a4-8583-7b1b911f92bb
\.


--
-- TOC entry 3245 (class 0 OID 34528)
-- Dependencies: 213
-- Data for Name: songs_publishers_publishers; Type: TABLE DATA; Schema: public; Owner: forest
--

COPY public.songs_publishers_publishers (song_id, publisher_id) FROM stdin;
\.


--
-- TOC entry 3246 (class 0 OID 34543)
-- Dependencies: 214
-- Data for Name: songs_writers_artists; Type: TABLE DATA; Schema: public; Owner: forest
--

COPY public.songs_writers_artists (song_id, artist_id) FROM stdin;
\.


--
-- TOC entry 3254 (class 0 OID 0)
-- Dependencies: 206
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: forest
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, false);


--
-- TOC entry 3078 (class 2606 OID 34436)
-- Name: artists artists_pkey; Type: CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);


--
-- TOC entry 3080 (class 2606 OID 34444)
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- TOC entry 3082 (class 2606 OID 34455)
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- TOC entry 3084 (class 2606 OID 34463)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3086 (class 2606 OID 34471)
-- Name: playlists playlists_pkey; Type: CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_pkey PRIMARY KEY (id);


--
-- TOC entry 3090 (class 2606 OID 34494)
-- Name: playlists_songs_songs playlists_songs_songs_playlist_id_song_id_key; Type: CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.playlists_songs_songs
    ADD CONSTRAINT playlists_songs_songs_playlist_id_song_id_key UNIQUE (playlist_id, song_id);


--
-- TOC entry 3092 (class 2606 OID 34512)
-- Name: publishers publishers_pkey; Type: CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT publishers_pkey PRIMARY KEY (id);


--
-- TOC entry 3094 (class 2606 OID 34517)
-- Name: songs_genres_genres songs_genres_genres_genre_id_song_id_key; Type: CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.songs_genres_genres
    ADD CONSTRAINT songs_genres_genres_genre_id_song_id_key UNIQUE (genre_id, song_id);


--
-- TOC entry 3088 (class 2606 OID 34479)
-- Name: songs songs_pkey; Type: CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (id);


--
-- TOC entry 3096 (class 2606 OID 34532)
-- Name: songs_publishers_publishers songs_publishers_publishers_publisher_id_song_id_key; Type: CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.songs_publishers_publishers
    ADD CONSTRAINT songs_publishers_publishers_publisher_id_song_id_key UNIQUE (publisher_id, song_id);


--
-- TOC entry 3098 (class 2606 OID 34547)
-- Name: songs_writers_artists songs_writers_artists_artist_id_song_id_key; Type: CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.songs_writers_artists
    ADD CONSTRAINT songs_writers_artists_artist_id_song_id_key UNIQUE (artist_id, song_id);


--
-- TOC entry 3101 (class 2606 OID 34495)
-- Name: playlists_songs_songs playlists_songs_songs_playlist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.playlists_songs_songs
    ADD CONSTRAINT playlists_songs_songs_playlist_id_fkey FOREIGN KEY (playlist_id) REFERENCES public.playlists(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3102 (class 2606 OID 34500)
-- Name: playlists_songs_songs playlists_songs_songs_song_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.playlists_songs_songs
    ADD CONSTRAINT playlists_songs_songs_song_id_fkey FOREIGN KEY (song_id) REFERENCES public.songs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3099 (class 2606 OID 34480)
-- Name: songs songs_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3104 (class 2606 OID 34523)
-- Name: songs_genres_genres songs_genres_genres_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.songs_genres_genres
    ADD CONSTRAINT songs_genres_genres_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3103 (class 2606 OID 34518)
-- Name: songs_genres_genres songs_genres_genres_song_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.songs_genres_genres
    ADD CONSTRAINT songs_genres_genres_song_id_fkey FOREIGN KEY (song_id) REFERENCES public.songs(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3100 (class 2606 OID 34485)
-- Name: songs songs_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.languages(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3106 (class 2606 OID 34538)
-- Name: songs_publishers_publishers songs_publishers_publishers_publisher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.songs_publishers_publishers
    ADD CONSTRAINT songs_publishers_publishers_publisher_id_fkey FOREIGN KEY (publisher_id) REFERENCES public.publishers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3105 (class 2606 OID 34533)
-- Name: songs_publishers_publishers songs_publishers_publishers_song_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.songs_publishers_publishers
    ADD CONSTRAINT songs_publishers_publishers_song_id_fkey FOREIGN KEY (song_id) REFERENCES public.songs(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3108 (class 2606 OID 34553)
-- Name: songs_writers_artists songs_writers_artists_artist_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.songs_writers_artists
    ADD CONSTRAINT songs_writers_artists_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3107 (class 2606 OID 34548)
-- Name: songs_writers_artists songs_writers_artists_song_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: forest
--

ALTER TABLE ONLY public.songs_writers_artists
    ADD CONSTRAINT songs_writers_artists_song_id_fkey FOREIGN KEY (song_id) REFERENCES public.songs(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2020-07-02 23:18:12 CEST

--
-- PostgreSQL database dump complete
--

