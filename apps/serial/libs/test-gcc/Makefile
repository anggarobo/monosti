# Makefile for simple C++ program

CC = gcc
CFLAGS = -Wall -Wextra -O2
DLL_NAME = mylib.dll

all: $(DLL_NAME)

$(DLL_NAME): mylib.c
	$(CC) -shared -o $(DLL_NAME) mylib.c -Wl,--out-implib,libmylib.a


test: main.c $(DLL_NAME)
	$(CC) -o main.exe main.c -L. -lmylib

clean:
	del *.o
	del *.exe
	del *.a
	del *.dll
