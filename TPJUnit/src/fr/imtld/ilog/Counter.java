package fr.imtld.ilog;

public class Counter {
	int value;

	public void up() {
		value++;
	}

	public int getValue() {
		return value;
	}

	@Override
	public String toString() {
		return Integer.toString(value);
	}
}