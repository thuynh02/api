/* Tables */

CREATE TABLE capability (
    capability_id serial NOT NULL,
    party_id integer NOT NULL,
    capability_name character varying(64),
    category character varying(64),
    skill character varying(255)[],
    type character varying(32)
);

CREATE TABLE category (
    category_id serial NOT NULL,
    capability_id integer NOT NULL,
    category_name character varying(64),
);

CREATE TABLE skill (
    skill_id serial NOT NULL,
    category_id integer
);

CREATE TABLE educational_material (
    educational_material_id serial NOT NULL,
    party_id integer NOT NULL,
    submitted_by integer NOT NULL,
    type character varying(32),
    title character varying(255),
    author character varying(64),
    description character varying(512),
    user_lvl character varying(20),
    is_recommended boolean
);

CREATE TABLE "group" (
    group_id serial NOT NULL,
    name character varying(64)
);

CREATE TABLE party (
    party_id serial NOT NULL,
    party_type character varying(64)
);

CREATE TABLE person (
    person_id serial NOT NULL,
    group_id integer NOT NULL,
    auth0_id character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    cohort character varying(3),
    office character varying(20),
    phone  character varying(12),
    email character varying(255),
    profile_picture character varying(255),
    skills_visited boolean DEFAULT false,
    info_visited boolean DEFAULT false,
    interests_visited boolean DEFAULT false
);

CREATE TABLE person_group (
    group_id serial NOT NULL,
    person_id integer NOT NULL
);

CREATE TABLE capability_assessment (
    person_id serial NOT NULL,
    capability_id integer NOT NULL,
    proficiency_lvl integer,
    interest_lvl integer
);

CREATE TABLE project (
    project_id serial NOT NULL,
    group_id integer NOT NULL,
    OIC integer NOT NULL,
    name character varying(255),
    description character varying(255),
    office character varying(20)
);

CREATE TABLE project_staff (
    project_id serial NOT NULL,
    person_id integer NOT NULL
);

CREATE TABLE project_capability (
    project_capability_id serial NOT NULL,
    project_id integer NOT NULL,
    capability_id integer NOT NULL,
    party_id integer NOT NULL,
    proficiency_lvl integer
);

/* Primary Keys */

ALTER TABLE ONLY capability ADD CONSTRAINT capability_pkey PRIMARY KEY (capability_id);

ALTER TABLE ONLY educational_material ADD CONSTRAINT educational_material_pkey PRIMARY KEY (educational_material_id);

ALTER TABLE ONLY "group" ADD CONSTRAINT group_pkey PRIMARY KEY (group_id);

ALTER TABLE ONLY party ADD CONSTRAINT party_pkey PRIMARY KEY (party_id);

ALTER TABLE ONLY person_group ADD CONSTRAINT person_group_pkey PRIMARY KEY (group_id, person_id);

ALTER TABLE ONLY person ADD CONSTRAINT person_pkey PRIMARY KEY (person_id);

ALTER TABLE ONLY capability_assessment ADD CONSTRAINT capability_assessment_pkey PRIMARY KEY (person_id, capability_id);

ALTER TABLE ONLY project ADD CONSTRAINT project_pkey PRIMARY KEY (project_id);

ALTER TABLE ONLY project_staff ADD CONSTRAINT project_staff_pkey PRIMARY KEY (project_id, person_id);

ALTER TABLE ONLY project_cap ADD CONSTRAINT project_capability_pkey PRIMARY KEY (project_capability_id);

/* Foreign Keys */

ALTER TABLE ONLY capability ADD CONSTRAINT capability_party_id_fkey FOREIGN KEY (party_id) REFERENCES party(party_id);

ALTER TABLE ONLY educational_material ADD CONSTRAINT educational_material_party_id_fkey FOREIGN KEY (party_id) REFERENCES party(party_id);

ALTER TABLE ONLY educational_material ADD CONSTRAINT educational_material_person_id_fkey FOREIGN KEY (submitted_by) REFERENCES person(person_id);

ALTER TABLE ONLY person_group ADD CONSTRAINT person_group_group_id_fkey FOREIGN KEY (group_id) REFERENCES "group"(group_id);

ALTER TABLE ONLY person_group ADD CONSTRAINT person_group_person_id_fkey FOREIGN KEY (person_id) REFERENCES person(person_id);

ALTER TABLE ONLY capability_assessment ADD CONSTRAINT capability_assessment_capability_id_fkey FOREIGN KEY (capability_id) REFERENCES capability(capability_id);

ALTER TABLE ONLY capability_assessment ADD CONSTRAINT capability_assessment_person_id_fkey FOREIGN KEY (person_id) REFERENCES person(person_id);

ALTER TABLE ONLY project ADD CONSTRAINT project_person_id_fkey FOREIGN KEY (OIC) REFERENCES person(person_id);

ALTER TABLE ONLY project ADD CONSTRAINT project_group_id_fkey FOREIGN KEY (group_id) REFERENCES "group"(group_id);

ALTER TABLE ONLY project_staff ADD CONSTRAINT project_staff_project_id_fkey FOREIGN KEY (project_id) REFERENCES project(project_id);

ALTER TABLE ONLY project_staff ADD CONSTRAINT project_staff_person_id_fkey FOREIGN KEY (person_id) REFERENCES person(person_id);

ALTER TABLE ONLY project_cap ADD CONSTRAINT project_capability_project_id_fkey FOREIGN KEY (project_id) REFERENCES project(project_id);

ALTER TABLE ONLY project_cap ADD CONSTRAINT project_capability_capability_id_fkey FOREIGN KEY (capability_id) REFERENCES capability(capability_id);

ALTER TABLE ONLY project_cap ADD CONSTRAINT project_capability_party_id_fkey FOREIGN KEY (party_id) REFERENCES party(party_id);

/* Field Constraints */

ALTER TABLE capability ADD CONSTRAINT capability_type CHECK (type = 'Technical' OR type = 'Business' OR type = 'Management');

ALTER TABLE project_cap ADD CONSTRAINT project_capability_proficiency_lvl CHECK (proficiency_lvl = 0 OR proficiency_lvl = 1 OR proficiency_lvl = 2 OR proficiency_lvl = 3 OR proficiency_lvl = 4);

ALTER TABLE capability_assessment ADD CONSTRAINT capability_assessment_proficiency_lvl CHECK (proficiency_lvl = 0 OR proficiency_lvl = 1 OR proficiency_lvl = 2 OR proficiency_lvl = 3 OR proficiency_lvl = 4);

ALTER TABLE capability_assessment ADD CONSTRAINT capability_assessment_interest_lvl CHECK (interest_lvl = 0 OR interest_lvl = 1 OR interest_lvl = 2 OR interest_lvl = 3 OR interest_lvl = 4);

ALTER TABLE educational_material ADD CONSTRAINT educational_material_type CHECK (type = 'Book' OR type = 'Website' OR type = 'Video');

ALTER TABLE educational_material ADD CONSTRAINT educational_material_user_lvl CHECK (user_lvl = 'Beginner' OR user_lvl = 'Novice' OR user_lvl = 'Intermediate' OR user_lvl = 'Advanced' OR user_lvl = 'Professional');

/* End */
