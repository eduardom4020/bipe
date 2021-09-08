-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION "admin";

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP SEQUENCE public.answers_id_seq;

CREATE SEQUENCE public.answers_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.answers_id_seq OWNER TO "admin";
GRANT ALL ON SEQUENCE public.answers_id_seq TO admin;

-- DROP SEQUENCE public.form_id_seq;

CREATE SEQUENCE public.form_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.form_id_seq OWNER TO "admin";
GRANT ALL ON SEQUENCE public.form_id_seq TO admin;

-- DROP SEQUENCE public.grade_id_seq;

CREATE SEQUENCE public.grade_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.grade_id_seq OWNER TO "admin";
GRANT ALL ON SEQUENCE public.grade_id_seq TO admin;

-- DROP SEQUENCE public.question_id_seq;

CREATE SEQUENCE public.question_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.question_id_seq OWNER TO "admin";
GRANT ALL ON SEQUENCE public.question_id_seq TO admin;

-- DROP SEQUENCE public.question_type_id_seq;

CREATE SEQUENCE public.question_type_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.question_type_id_seq OWNER TO "admin";
GRANT ALL ON SEQUENCE public.question_type_id_seq TO admin;

-- DROP SEQUENCE public.tier_id_seq;

CREATE SEQUENCE public.tier_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.tier_id_seq OWNER TO "admin";
GRANT ALL ON SEQUENCE public.tier_id_seq TO admin;

-- DROP SEQUENCE public.user_id_seq;

CREATE SEQUENCE public.user_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.user_id_seq OWNER TO "admin";
GRANT ALL ON SEQUENCE public.user_id_seq TO admin;
-- public.form definition

-- Drop table

-- DROP TABLE public.form;

CREATE TABLE public.form (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(300) NOT NULL,
	CONSTRAINT form_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.form OWNER TO "admin";
GRANT ALL ON TABLE public.form TO admin;


-- public.grade definition

-- Drop table

-- DROP TABLE public.grade;

CREATE TABLE public.grade (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(100) NOT NULL,
	CONSTRAINT grade_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.grade OWNER TO "admin";
GRANT ALL ON TABLE public.grade TO admin;


-- public.objective_answer definition

-- Drop table

-- DROP TABLE public.objective_answer;

CREATE TABLE public.objective_answer (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	html_content varchar(2000) NOT NULL,
	"label" varchar(50) NOT NULL,
	CONSTRAINT answer_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.objective_answer OWNER TO "admin";
GRANT ALL ON TABLE public.objective_answer TO admin;


-- public.question_type definition

-- Drop table

-- DROP TABLE public.question_type;

CREATE TABLE public.question_type (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(20) NOT NULL,
	CONSTRAINT question_type_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.question_type OWNER TO "admin";
GRANT ALL ON TABLE public.question_type TO admin;


-- public.tier definition

-- Drop table

-- DROP TABLE public.tier;

CREATE TABLE public.tier (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"name" varchar(50) NOT NULL,
	CONSTRAINT tier_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.tier OWNER TO "admin";
GRANT ALL ON TABLE public.tier TO admin;


-- public."user" definition

-- Drop table

-- DROP TABLE public."user";

CREATE TABLE public."user" (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	username varchar(50) NOT NULL,
	created_at date NULL DEFAULT now(),
	"password" varchar(1000) NOT NULL,
	is_active bool NOT NULL DEFAULT true,
	CONSTRAINT user_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public."user" OWNER TO "admin";
GRANT ALL ON TABLE public."user" TO admin;


-- public.question definition

-- Drop table

-- DROP TABLE public.question;

CREATE TABLE public.question (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	html_content varchar(8000) NOT NULL,
	type_id int4 NOT NULL,
	max_points int4 NOT NULL DEFAULT 0,
	"label" varchar(50) NOT NULL,
	CONSTRAINT question_pk PRIMARY KEY (id),
	CONSTRAINT question_fk FOREIGN KEY (type_id) REFERENCES public.question_type(id) ON DELETE SET NULL ON UPDATE SET NULL
);

-- Permissions

ALTER TABLE public.question OWNER TO "admin";
GRANT ALL ON TABLE public.question TO admin;


-- public.question_objective_answers definition

-- Drop table

-- DROP TABLE public.question_objective_answers;

CREATE TABLE public.question_objective_answers (
	question_id int4 NOT NULL,
	objective_answer_id int4 NOT NULL,
	is_correct bool NOT NULL DEFAULT false,
	CONSTRAINT question_objective_answers_pk PRIMARY KEY (question_id, objective_answer_id),
	CONSTRAINT question_objective_answers_fk FOREIGN KEY (question_id) REFERENCES public.question(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT question_objective_answers_fk_1 FOREIGN KEY (objective_answer_id) REFERENCES public.objective_answer(id) ON DELETE SET NULL ON UPDATE SET NULL
);

-- Permissions

ALTER TABLE public.question_objective_answers OWNER TO "admin";
GRANT ALL ON TABLE public.question_objective_answers TO admin;


-- public.student definition

-- Drop table

-- DROP TABLE public.student;

CREATE TABLE public.student (
	user_id int4 NOT NULL,
	"name" varchar(300) NOT NULL,
	nickname varchar(50) NULL,
	social_name varchar(300) NULL,
	grade_id int4 NOT NULL DEFAULT 1,
	total_points int8 NOT NULL DEFAULT 0,
	current_points int8 NOT NULL DEFAULT 0,
	tier_id int4 NOT NULL DEFAULT 1,
	CONSTRAINT student_pk PRIMARY KEY (user_id),
	CONSTRAINT student_grade_fk FOREIGN KEY (grade_id) REFERENCES public.grade(id) ON DELETE SET NULL ON UPDATE SET NULL,
	CONSTRAINT student_tier_fk FOREIGN KEY (tier_id) REFERENCES public.tier(id) ON DELETE SET DEFAULT ON UPDATE SET DEFAULT,
	CONSTRAINT student_user_fk FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Permissions

ALTER TABLE public.student OWNER TO "admin";
GRANT ALL ON TABLE public.student TO admin;


-- public.form_questions definition

-- Drop table

-- DROP TABLE public.form_questions;

CREATE TABLE public.form_questions (
	form_id int4 NOT NULL,
	question_id int4 NOT NULL,
	CONSTRAINT form_questions_pk PRIMARY KEY (form_id, question_id),
	CONSTRAINT form_questions_fk FOREIGN KEY (form_id) REFERENCES public.form(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT form_questions_fk_1 FOREIGN KEY (question_id) REFERENCES public.question(id) ON DELETE SET NULL ON UPDATE SET NULL
);

-- Permissions

ALTER TABLE public.form_questions OWNER TO "admin";
GRANT ALL ON TABLE public.form_questions TO admin;


-- public.question_answared_by_student definition

-- Drop table

-- DROP TABLE public.question_answared_by_student;

CREATE TABLE public.question_answared_by_student (
	question_id int4 NOT NULL,
	student_user_id int4 NOT NULL,
	objective_answer_id int4 NULL,
	answer_html_content varchar(8000) NOT NULL DEFAULT ''::character varying,
	points int4 NOT NULL DEFAULT 0,
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	CONSTRAINT question_answared_by_student_fk_1 FOREIGN KEY (objective_answer_id) REFERENCES public.objective_answer(id) ON DELETE SET NULL ON UPDATE SET NULL,
	CONSTRAINT question_answared_by_student_question_fk FOREIGN KEY (question_id) REFERENCES public.question(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT question_answared_by_student_user_id_fk FOREIGN KEY (student_user_id) REFERENCES public.student(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Permissions

ALTER TABLE public.question_answared_by_student OWNER TO "admin";
GRANT ALL ON TABLE public.question_answared_by_student TO admin;


-- public.question_blocked_to_student definition

-- Drop table

-- DROP TABLE public.question_blocked_to_student;

CREATE TABLE public.question_blocked_to_student (
	student_user_id int4 NOT NULL,
	question_id int4 NOT NULL,
	blocked_until date NOT NULL,
	CONSTRAINT question_blocked_to_student_pk PRIMARY KEY (student_user_id, question_id),
	CONSTRAINT question_blocked_to_student_question_fk FOREIGN KEY (question_id) REFERENCES public.question(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT question_blocked_to_student_user_id_fk FOREIGN KEY (student_user_id) REFERENCES public.student(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Permissions

ALTER TABLE public.question_blocked_to_student OWNER TO "admin";
GRANT ALL ON TABLE public.question_blocked_to_student TO admin;



CREATE OR REPLACE FUNCTION public.function_trigger_user_answer_objective_question()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	BEGIN
		if old.objective_answer_id is not null then
			update public.question_answared_by_student
			set points = (case when (curr_answer.is_correct = true) then curr_answer.max_points else 0 end),
				answer_html_content = curr_answer.html_content
			from (
				select qoa.is_correct, q.max_points, oa.html_content 
				from public.question_objective_answers qoa
				inner join public.question q
					on q.id = qoa.question_id
				inner join public.question_type t
					on q.type_id = t.id 
				inner join public.objective_answer oa
					on oa.id = qoa.objective_answer_id
				where qoa.objective_answer_id = old.objective_answer_id
					and qoa.question_id = old.question_id
					and t."name" = 'Questão Objetiva' 
			) as curr_answer;
		end if;
		return old;
	END;
$function$
;

-- Permissions

ALTER FUNCTION public.function_trigger_user_answer_objective_question() OWNER TO "admin";
GRANT ALL ON FUNCTION public.function_trigger_user_answer_objective_question() TO admin;


-- Permissions

GRANT ALL ON SCHEMA public TO admin;
GRANT ALL ON SCHEMA public TO public;

-- data insertion


INSERT INTO public.grade ("name") VALUES
	 ('6 EF');

INSERT INTO public.question_type ("name") VALUES
	 ('Questão Objetiva'),
	 ('Questão Subjetiva');

INSERT INTO public.tier ("name") VALUES
	 ('Mafagafo'),
	 ('Padawan'),
	 ('Jhon Snow'),
	 ('Brabo'),
	 ('Jedi');

INSERT INTO public."user" (username,"password",is_active) VALUES
	 ('admin', 'U2FsdGVkX18ze5vAngLdrD1I7vP3lj35g13VBjKvFOY=',true);

INSERT INTO public.student (user_id,"name",nickname,social_name,grade_id,total_points,current_points,tier_id) VALUES
	 (1,'Adminilson',NULL,NULL,1,0,0,1);

    