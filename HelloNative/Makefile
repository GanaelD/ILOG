JDK = C:/Program Files/Java/jdk-19

INCLUDES = -I"$(JDK)/include" -I"$(JDK)/include/win32"

CFLAGS += $(INCLUDES)

OBJS = Display.o

TARGET = ../HelloJNI/libHelloNative.so

Display.o: Display.c fr_imtld_ilog_Display.h

$(TARGET): $(OBJS)
	$(CXX) -shared -o $(TARGET) $(OBJS)

all: $(TARGET)

clean:
	$(RM) $(OBJS) $(TARGET)