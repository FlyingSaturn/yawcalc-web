# Building from source

You know how to clone a project, right? In case you simply want to run it, here it is:

`git clone https://github.com/FlyingSaturn/yawcalc-web.git`

I personally recommend using SSH instead of HTTPS for cloning. But in case you're just starting out, there's no need to do that. Just ensure that your name and email in the Git configs (local or global) are actually the one you want to reveal to the world.

Anyway, this project can be run in two ways:

1) Use Maven and any latest version of Java 
2) Use the Dockerfile provided

Note that the main project file is under `demo/`. You need to be under the demo directory to properly run the files.

# Using Maven

Install Maven and Java 17+. You might have to set the environment variables. 

```
cd demo/
mvn spring-boot:run
```
That's it. Just go to localhost:8080 and enjoy the creation. 

(In Fedora, I just entered `mvn` before running the commands and Maven was instantly installed, without the headache of environment variables.)

#Using Docker containers

This was intended to be easy, but this one's harder in Fedora. Install docker and resolve all the issues you have (if any).

```
cd demo/
docker build -t yawcalc . # It will download stuff
docker run -p 8080:8080 yawcalc
```
(In Fedora, you need to give superuser privileges for all the commands associated with Docker. Even the `docker command1 $(docker command2)` needs `sudo docker command1 $(sudo docker command2)`.).

# Development

I highly recommend VSCode for developing Maven applications. But you can use any other options too.

# PRs

I won't be accepting any PRs related to the static code. Refer to https://github.com/FlyingSaturn/yawcalc for those PRs.

For changes in the Java code, I'll be happily accepting PRs from everyone in this repository. In case you have changed the logic of generating the Yaw Angle, please make a second PR in the JS code too (if you know JS).
