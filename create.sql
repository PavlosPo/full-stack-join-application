create table post (id integer generated by default as identity, user_id integer, created_date timestamp(6), updated_date timestamp(6), content varchar(512) not null, primary key (id));
create table user_friends (friend_id integer not null, user_id integer not null);
create table user_likes_posts (post_id integer not null, user_id integer not null);
create table users (id integer generated by default as identity, email varchar(255), firstname varchar(255), lastname varchar(255), password varchar(255), token varchar(255), username varchar(255), primary key (id));
alter table if exists post add constraint FK7ky67sgi7k0ayf22652f7763r foreign key (user_id) references users;
alter table if exists user_friends add constraint FK11y5boh1e7gh60rdqixyetv3x foreign key (friend_id) references users;
alter table if exists user_friends add constraint FKk08ugelrh9cea1oew3hgxryw2 foreign key (user_id) references users;
alter table if exists user_likes_posts add constraint FKidqwpgr5gqg1ghnoq0gkvh6vd foreign key (post_id) references post;
alter table if exists user_likes_posts add constraint FKbpq3k7t468tfhrbbub8k0f6wp foreign key (user_id) references users;
create table post (id integer generated by default as identity, user_id integer, created_date timestamp(6), updated_date timestamp(6), content varchar(512) not null, primary key (id));
create table user_friends (friend_id integer not null, user_id integer not null);
create table user_likes_posts (post_id integer not null, user_id integer not null);
create table users (id integer generated by default as identity, email varchar(255), firstname varchar(255), lastname varchar(255), password varchar(255), token varchar(255), username varchar(255), primary key (id));
alter table if exists post add constraint FK7ky67sgi7k0ayf22652f7763r foreign key (user_id) references users;
alter table if exists user_friends add constraint FK11y5boh1e7gh60rdqixyetv3x foreign key (friend_id) references users;
alter table if exists user_friends add constraint FKk08ugelrh9cea1oew3hgxryw2 foreign key (user_id) references users;
alter table if exists user_likes_posts add constraint FKidqwpgr5gqg1ghnoq0gkvh6vd foreign key (post_id) references post;
alter table if exists user_likes_posts add constraint FKbpq3k7t468tfhrbbub8k0f6wp foreign key (user_id) references users;