package fr.imtld.ilog;

public class TimeBaseMock implements ITimeBase{
	
	protected long now;
	
	@Override
	public long now() {
		return now;
	}
	
	public void setNow(long lt) {
		this.now= lt;
	}

}
