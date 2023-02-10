
package fr.imtld.ilog;

public class Clock {
	protected long _lT0 = 0;
	protected ITimeBase _itb;
	
	protected long now() {
		return _itb.now();
	}

	public Clock(ITimeBase _itb) {
		_lT0 = now();
		this._itb = _itb;
	}

	public int getDay() {
		return (int) (now() - _lT0) / 86400000;
	}

	public int getHour() {
		return (((int) (now() - _lT0)) / 3600000) % 24;
	}

	public int getMinute() {
		return (((int) (now() - _lT0)) / 60000) % 60;
	}

	public int getSecond() {
		return (((int) (now() - _lT0)) / 1000) % 60;
	}

	public int getTime() {
		return (int) (now() - _lT0) % 604800000;
	}

	public void setDay(int iDay) {
		if ((((int) (now() - _lT0)) / 86400000) < iDay) {
			_lT0 = (long) (_lT0 - (iDay - (((int) (now() - _lT0)) / 86400000)) * 86400000);
		} else {
			_lT0 = (long) (_lT0 - ((((int) (now() - _lT0)) / 86400000) - iDay) * 86400000);
		}
	}

	public void setHour(int iHour) {
		if (((((int) (now() - _lT0)) / 3600000) % 24) < iHour) {
			_lT0 = (long) (_lT0 - (iHour - ((((int) (now() - _lT0)) / 3600000) % 24)) * 3600000);
		} else {
			_lT0 = (long) (_lT0 - (((((int) (now() - _lT0)) / 3600000) % 24) - iHour) * 3600000);
		}
	}

	public void setMinute(int iMinute) {
		if (((((int) (now() - _lT0)) / 60000) % 60) < iMinute) {
			_lT0 = (long) (_lT0 - (iMinute - ((((int) (now() - _lT0)) / 60000) % 60)) * 60000);
		} else {
			_lT0 = (long) (_lT0 - (((((int) (now() - _lT0)) / 60000) % 60) - iMinute) * 60000);
		}
		_lT0 = (long) ((_lT0 + ((((int) (now() - _lT0)) / 1000) % 60) * 1000));
		_lT0 = (long) (_lT0 + (((int) (now() - _lT0) % 604800000) % 1000));
	}

	public void setTime(int iNow) {
		_lT0 = now() - iNow;
	}
}