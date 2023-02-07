CC = gcc
-include rules.mk

CuTest.o: CuTest.c
	echo 'Compiling CuTest.c into CuTest.o'
	gcc -c CuTest.c

libcutest.a: CuTest.o
	ar -r libs/libcutest.a CuTest.o
	echo 'The library {libcutest.a} is ready and was placed in ws/libs/'

tests:	CuTestTest.c AllTests.c CuTest.o libcutest.a
	gcc    -c -o AllTests.o AllTests.c
	gcc    -c -o CuTestTest.o CuTestTest.c
	gcc -o tests AllTests.o CuTestTest.o CuTest.o -L libs/licutest.a
	echo 'The executable {tests} is ready'

clean:
	rm -f *.o
	rm -f *.a
	rm -f tests.exe

all:	clean tests

test: tests
	./tests.exe

depend:
	gcc -MM *.c>rules.mk

