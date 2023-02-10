package fr.imtld.ilog;

public class TimeBaseMock implements ITimeBase{
	
	protected long lt;
	
	@Override
	public long now() {
		return lt;
	}
	
	public void setNow(long lt) {
		this.lt = lt;
	}

}
