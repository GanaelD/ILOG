hello:	hello.c
	echo 'Compilation de hello.c'
	gcc -o hello hello.c
	echo 'L'executable est pret'

clean:
	rm -f *.o
	rm -f *.exe

.PHONY:	all
	
all:	clean	hello
	echo 'Cleaning and compiling'
