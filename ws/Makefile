CC = gcc
-include rules.mk

CuTest.o: CuTest.c
	echo 'Compiling CuTest.c into CuTest.o'
	gcc -c CuTest.c

libcutest.a: CuTest.o
	ar -r libcutest.a CuTest.c
	echo 'The library {libcutest.a} is ready'

tests:	CuTestTest.c AllTests.c CuTest.o
	gcc    -c -o AllTests.o AllTests.c
	gcc    -c -o CuTestTest.o CuTestTest.c
	gcc -o tests AllTests.o CuTestTest.o CuTest.o
	echo 'The executable {tests} is ready'

clean:
	rm -f *.o
	rm -f *.a
	rm -f tests.exe

all:	clean libcutest.a tests

test: tests
	./tests.exe

depend:
	gcc -MM *.c>rules.mk

